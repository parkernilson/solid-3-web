import type { SupabaseDomainConverter } from '$lib/model/converters/supabase/SupabaseDomainConverter';
import {
	CurrentStreakInfo,
	Entry,
	Goal,
	StreakInfo,
	type ActivityInfo,
	type IGoalInfo,
	type ISharedGoal,
	type ISharedGoalPreview
} from '$lib/model/domain/goals';
import type { ShareRecord } from '$lib/model/domain/goals/ShareRecord';
import { UserProfile } from '$lib/model/domain/users';
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
	RejectSharedGoalParams,
	ShareGoalParams,
	UnshareGoalParams,
	UpsertEntryParams,
	UpsertEntryResult
} from './GoalService.svelte';
import type { SupabaseAuthService } from './SupabaseAuthService.svelte';

export class SupabaseGoalService implements GoalService {
	constructor(
		private supabase: SupabaseClient,
		private converter: SupabaseDomainConverter,
		private authService: SupabaseAuthService
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

	private async getLastEntry(goalId: string): Promise<Entry | null> {
		const { data, error } = await this.supabase
			.from('entries')
			.select('*')
			.eq('goal', goalId)
			.order('date_of', { ascending: false })
			.limit(1)
			.maybeSingle();
		if (error) throw error;
		if (!data) return null;
		return this.converter.convertEntry(data);
	}

	private async getActivity(goalId: string): Promise<ActivityInfo> {
		const lastEntry = await this.getLastEntry(goalId);
		if (!lastEntry) {
			return {};
		}
		return {
			lastEntry
		}
	}

	async getGoalInfo(goalId: string): Promise<IGoalInfo> {
		const goalData = await this.getGoal(goalId);

		const activityInfo = await this.getActivity(goalId);

		const currentStreakInfo = await this.getCurrentStreak({ goalId });

		const recordStreakInfo = await this.getRecordStreak({ goalId });

		return {
			...goalData.toJson(),
			activity: {
				lastEntry: activityInfo.lastEntry
			},
			streak: currentStreakInfo?.toJson() ?? null,
			record: recordStreakInfo?.toJson() ?? null
		};
	}

	private async listGoals(userId: string) {
		return this.supabase.from('goals').select('*').eq('owner', userId);
	}

	async listGoalInfos(userId: string): Promise<IGoalInfo[]> {
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
		// TODO: implement email sending / notification
		await this.supabase.rpc('share_goal', { _goal_id: goalId, _with_user: withUser });
	}

	async rejectSharedGoal({ goalId }: RejectSharedGoalParams): Promise<void> {
		await this.supabase.rpc('reject_shared_goal', { _goal_id: goalId });
	}

	async unshareGoal({ goalId, withUser }: UnshareGoalParams): Promise<void> {
		await this.supabase.rpc('unshare_goal', { _goal_id: goalId, _with_user: withUser });
	}

	async acceptSharedGoal({ goalId }: AcceptSharedGoalParams): Promise<void> {
		await this.supabase.rpc('accept_shared_goal', { _goal_id: goalId });
	}

	private async getCurrentStreak({
		goalId
	}: getCurrentStreakParams): Promise<CurrentStreakInfo | null> {
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

	async getSharedWithUsers(goalId: string): Promise<ShareRecord[]> {
		const { data: supabaseShareRecords, error: shareRecordsError } = await this.supabase
			.from('share_records')
			.select('*')
			.eq('goal', goalId);
		if (shareRecordsError) throw shareRecordsError;
		if (!supabaseShareRecords) return [];
		const userIds = supabaseShareRecords.map((record) => record.shared_with);
		const { data: usersData, error: usersError } = await this.supabase
			.from('profiles')
			.select('*')
			.in('id', userIds);
		if (usersError) throw usersError;
		if (!usersData) throw new Error('Users could not be fetched');
		const shareRecords = supabaseShareRecords.map((record) => {
			const user = usersData.find((user) => user.id === record.shared_with);
			if (!user) throw new Error('User not found');
			return this.converter.convertShareRecord(user, record);
		});
		return shareRecords;
	}

	async getUsersPaginated(
		searchTerm: string,
		{ pageSize, exclusiveStartKey }: PaginatedRequest<string>,
		excludeUserId?: string
	): Promise<PaginatedResponse<UserProfile>> {
		const query = this.supabase
			.from('profiles')
			.select('*')
			.ilike('email', `%${searchTerm}%`)
			.limit(pageSize + 1);

		if (exclusiveStartKey) {
			query.gt('email', exclusiveStartKey);
		}

		if (excludeUserId) {
			query.neq('id', excludeUserId);
		}

		const { data, error } = await query;
		if (error) {
			throw error;
		}

		const hasMore = data.length > pageSize;
		const requestedPage = data.slice(0, pageSize).map(this.converter.convertUserProfile);

		return {
			data: requestedPage,
			hasMore
		};
	}

	async listShareRecords(user: UserProfile): Promise<ShareRecord[]> {
		const { data, error } = await this.supabase
			.from('share_records')
			.select('*')
			.eq('shared_with', user.id);
		if (error) throw error;
		if (!data) return [];
		const shareRecords = data.map((shareRecord) =>
			this.converter.convertShareRecord(user, shareRecord)
		);
		return shareRecords;
	}

	async listSharedGoalPreviewsWithUser(user: UserProfile): Promise<ISharedGoalPreview[]> {
		const { data, error } = await this.supabase
			.from('shared_goal_previews')
			.select('*')
			.eq('shared_with', user.id);
		if (error) throw error;
		if (!data) return [];
		return data.map((sharedGoalRow) => {
			if (!isNotNullRow(sharedGoalRow)) {
				throw new Error('Shared goal row has null values');
			}
			return this.converter.convertSharedGoalPreview(sharedGoalRow);
		});
	}

	async listSharedGoalsWithUser(user: UserProfile): Promise<ISharedGoal[]> {
		const { data, error } = await this.supabase
			.from('shared_goals')
			.select('*')
			.eq('shared_with', user.id);
		if (error) throw error;
		if (!data) return [];
		return data.map((sharedGoalRow) => {
			if (!isNotNullRow(sharedGoalRow)) {
				throw new Error('Shared goal row has null values');
			}
			return this.converter.convertSharedGoal(sharedGoalRow);
		});
	}
}
