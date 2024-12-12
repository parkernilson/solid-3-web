import type { Entry, GoalInfo } from '$lib/model/goals';
import type { Database } from '$lib/supabase/database.types';
import type { SupabaseClient } from '$lib/supabase/supabase';
import type { CamelCase } from '$lib/utils/types';
import type { PaginatedResponse } from '$lib/utils/types/pagination/PaginatedReponse';
import type { PaginatedRequest } from '$lib/utils/types/pagination/PaginatedRequest';
import type { AcceptSharedGoalParams, CreateGoalParams, CreateGoalResult, GoalService, ShareGoalParams, UpsertEntryParams, UpsertEntryResult } from './GoalService.svelte';

export class SupabaseGoalService implements GoalService {
	constructor(private supabase: SupabaseClient) {}

	private async getGoal(goalId: string) {
		return this.supabase.from('goals').select('*').eq('id', goalId).maybeSingle();
	}

	async getGoalInfo(goalId: string): Promise<GoalInfo> {
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

	private async listGoals(userId: string) {
		return this.supabase.from('goals').select('*').eq('owner', userId);
	}

	async listGoalInfos(userId: string): Promise<GoalInfo[]> {
		const { data: goalsData, error: goalsError } = await this.listGoals(userId);
		if (goalsError) {
			throw goalsError;
		}
		if (!goalsData) {
			throw new Error('Goals not found');
		}

		return Promise.all(
			goalsData.map(async (goal) => {
				return this.getGoalInfo(goal.id);
			})
		);
	}

	async getEntriesPaginated(
		goalId: string,
		{ pageSize, exclusiveStartKey }: PaginatedRequest<string>
	): Promise<PaginatedResponse<Entry>> {
		const query = this.supabase
			.from('entries')
			.select('*')
			.eq('goal', goalId)
			.order('date_of', { ascending: false })
			.limit(pageSize + 1);

		if (exclusiveStartKey) {
			query.lt('date_of', exclusiveStartKey);
		}

		const { data, error } = await query;
		if (error) {
			throw error;
		}

		const hasMore = data.length > pageSize;
		const requestedPage = data.slice(0, pageSize);

		return {
			data: requestedPage,
			hasMore
		};
	}

	async createGoal({ title }: CreateGoalParams): Promise<CreateGoalResult> {
		const { data, error } = await this.supabase.rpc('create_goal', { _title: title });
		if (error) {
			throw error;
		}
		return { id: data?.id, title };
	}

	async upsertEntry({
		goalId,
		entryId,
		dateOf,
		textContent,
		success
	}: UpsertEntryParams): Promise<UpsertEntryResult> {
		const { data, error } = await this.supabase.rpc('upsert_entry', {
			_goal_id: goalId,
			_entry_id: entryId,
			_date_of: dateOf,
			_text_content: textContent,
			_success: success
		});
		if (error) {
			throw error;
		}
		return data;
	}

	async shareGoal({
		goalId,
		withUser
	}: ShareGoalParams): Promise<void> {
		await this.supabase.rpc('share_goal', { _goal_id: goalId, _with_user: withUser });
	}

	async acceptSharedGoal({
		goalId
	}: AcceptSharedGoalParams): Promise<void> {
		await this.supabase.rpc('accept_shared_goal', { _goal_id: goalId });
	}

	private async getCurrentStreak({
		goalId
	}: CamelCase<Database['public']['Functions']['get_current_streak_info']['Args']>) {
		return this.supabase.rpc('get_current_streak_info', { _goal_id: goalId });
	}

	private async getRecordStreak({ goalId }: { goalId: string }) {
		return this.supabase
			.from('streak_summary')
			.select('*')
			.eq('goal', goalId)
			.order('streak_count', { ascending: false })
			.limit(1)
			.maybeSingle();
	}
}
