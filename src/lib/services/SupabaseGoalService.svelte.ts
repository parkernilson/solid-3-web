import type { SupabaseDomainConverter } from '$lib/model/converters/supabase/SupabaseDomainConverter';
import { CurrentStreakInfo, Entry, Goal, StreakInfo, type GoalInfo } from '$lib/model/domain/goals';
import type { SupabaseClient } from '$lib/supabase/supabase';
import { isNotNullRow } from '$lib/utils/types/isNotNullRow';
import type { PaginatedResponse } from '$lib/utils/types/pagination/PaginatedReponse';
import type { PaginatedRequest } from '$lib/utils/types/pagination/PaginatedRequest';
import type {
	AcceptSharedGoalParams,
	CreateGoalParams,
	CreateGoalResult,
	getCurrentStreakParams,
	GoalService,
	ShareGoalParams,
	UpsertEntryParams,
	UpsertEntryResult
} from './GoalService.svelte';

export class SupabaseGoalService implements GoalService {
	constructor(
		private supabase: SupabaseClient,
		private converter: SupabaseDomainConverter
	) {}

	private async getGoal(goalId: string): Promise<Goal> {
		const { data, error } = await this.supabase
			.from('goals')
			.select('*')
			.eq('id', goalId)
			.maybeSingle();
		if (error) throw error;
		if (!data) throw new Error('Goal not found');
		return this.converter.convertGoal(data);
	}

	async getGoalInfo(goalId: string): Promise<GoalInfo> {
		const goalData = await this.getGoal(goalId);

		const currentStreakInfo = await this.getCurrentStreak({ goalId });

		const recordStreakInfo = await this.getRecordStreak({ goalId });

		return {
			goal: goalData,
			streak: currentStreakInfo,
			record: recordStreakInfo
		};
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
		const requestedPage = data.slice(0, pageSize).map(this.converter.convertEntry);

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
		if (!data) {
			throw new Error('No data returned from upsert_entry');
		}
		return this.converter.convertEntry(data);
	}

	async shareGoal({ goalId, withUser }: ShareGoalParams): Promise<void> {
		await this.supabase.rpc('share_goal', { _goal_id: goalId, _with_user: withUser });
	}

	async acceptSharedGoal({ goalId }: AcceptSharedGoalParams): Promise<void> {
		await this.supabase.rpc('accept_shared_goal', { _goal_id: goalId });
	}

	private async getCurrentStreak({ goalId }: getCurrentStreakParams): Promise<CurrentStreakInfo | null> {
		const { data, error } = await this.supabase.rpc('get_current_streak_info', {
			_goal_id: goalId
		});
		if (error) throw error;
		if (!data || !isNotNullRow(data)) return null;
		return this.converter.convertCurrentStreakInfo(data);
	}

	private async getRecordStreak({ goalId }: { goalId: string }): Promise<StreakInfo | null> {
		const { data, error } = await this.supabase
			.from('streak_summary')
			.select('*')
			.eq('goal', goalId)
			.order('streak_count', { ascending: false })
			.limit(1)
			.maybeSingle();

		if (error) throw error;
		if (!data || !isNotNullRow(data)) return null;
		return this.converter.convertStreakInfo(data);
	}
}
