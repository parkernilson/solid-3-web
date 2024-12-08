import type { Entry, Goal, GoalWithStreak } from '$lib/model/goals';
import type { Database } from '$lib/supabase/database.types';
import { supabase } from '$lib/supabase/supabase';
import type { CamelCase } from '$lib/utils/types';
import { ErrorService } from './ErrorService.svelte';
import { SupabaseService } from './SupabaseService.svelte';

export class GoalService extends SupabaseService {
	static make(): GoalService {
		return new GoalService(supabase, ErrorService.instance());
	}

	async getGoal(goalId: string) {
		return this.supabase.from('goals').select('*').eq('id', goalId).maybeSingle();
	}

	async getGoalWithStreakInfo(goalId: string): Promise<GoalWithStreak> {
		const { data: goalData, error: goalError } = await this.getGoal(goalId);
		if (goalError) throw goalError;
		if (!goalData) {
			throw new Error('Goal not found');
		}

		const { data: streakData, error: streakError } = await this.getCurrentStreak({ goalId });
		if (streakError) {
			throw streakError;
		}
		if (!streakData) {
			throw new Error('Streak not found');
		}

		const { data: recordData, error: recordError } = await this.getRecordStreak({ goalId });
		if (recordError) {
			throw recordError;
		}
		if (!recordData) {
			throw new Error('Record not found');
		}

		return { ...goalData, streak: streakData, record: recordData };
	}

	async getGoals(userId: string) {
		return this.supabase.from('goals').select('*').eq('owner', userId);
	}

	async getGoalsWithStreaks(userId: string): Promise<GoalWithStreak[]> {
		const { data: goalsData, error: goalsError } = await this.getGoals(userId);
		if (goalsError) {
			throw goalsError;
		}
		if (!goalsData) {
			throw new Error('Goals not found');
		}

		return Promise.all(
			goalsData.map(async (goal) => {
				return this.getGoalWithStreakInfo(goal.id);
			})
		);
	}

	async getEntries(goalId: string) {
		return this.supabase.from('entries').select('*').eq('goal', goalId);
	}

	async createGoal({ title }: CamelCase<Omit<Goal, 'id' | 'created_at' | 'owner'>>) {
		return this.supabase.rpc('create_goal', { _title: title });
	}

	async createEntry({ goal, textContent, success }: CamelCase<Omit<Entry, 'id' | 'created_at'>>) {
		return this.supabase.rpc('create_entry', {
			_goal_id: goal,
			_text_content: textContent ?? undefined,
			_success: success
		});
	}

	async shareGoal({
		goalId,
		withUser
	}: CamelCase<Database['public']['Functions']['share_goal']['Args']>) {
		return this.supabase.rpc('share_goal', { _goal_id: goalId, _with_user: withUser });
	}

	async acceptSharedGoal({
		goalId
	}: CamelCase<Database['public']['Functions']['accept_shared_goal']['Args']>) {
		return this.supabase.rpc('accept_shared_goal', { _goal_id: goalId });
	}

	async getCurrentStreak({
		goalId
	}: CamelCase<Database['public']['Functions']['get_current_streak_info']['Args']>) {
		return this.supabase.rpc('get_current_streak_info', { _goal_id: goalId });
	}

	async getRecordStreak({ goalId }: { goalId: string }) {
		return this.supabase
			.from('streak_summary')
			.select('*')
			.eq('goal', goalId)
			.order("streak_count", { ascending: false })
			.limit(1)
			.maybeSingle();
	}
}
