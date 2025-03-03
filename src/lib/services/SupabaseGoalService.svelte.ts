import type { SupabaseDomainConverter } from '$lib/model/converters/supabase/SupabaseDomainConverter';
import { isSupabaseSharedGoal } from '$lib/model/db/supabase/SupabaseSharedGoal';
import { isSupabaseSharedGoalPreview } from '$lib/model/db/supabase/SupabaseSharedGoalPreview';
import {
	isSupabaseCurrentStreakInfoNotNull,
	isSupabaseCurrentStreakInfoNull,
	isSupabaseStreakInfoNotNull,
	isSupabaseStreakInfoNull
} from '$lib/model/db/supabase/SupabaseStreakInfo';
import {
	Goal,
	type IActivityInfo,
	type ICurrentStreakInfo,
	type IEntry,
	type IGoal,
	type IGoalInfo,
	type IGoalStats,
	type ISharedGoal,
	type ISharedGoalInfo,
	type ISharedGoalPreview,
	type IStreakInfo
} from '$lib/model/domain/goals';
import type { ShareRecord } from '$lib/model/domain/goals/ShareRecord';
import { UserProfile } from '$lib/model/domain/users';
import type { SupabaseClient } from '$lib/supabase/supabase';
import { toUTCString } from '$lib/utils/dates';
import { stripUndefined } from '$lib/utils/objects';
import type { PaginatedRequest, PaginatedResponse } from '$lib/utils/types';
import type {
	AcceptSharedGoalParams,
	CreateEntryParams,
	CreateEntryResult,
	CreateGoalParams,
	CreateGoalResult,
	getCurrentStreakParams,
	GoalService,
	RejectSharedGoalParams,
	ShareGoalParams,
	UnshareGoalParams,
	UpdateEntryParams,
	UpdateEntryResult
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
		return Goal.fromJson(this.converter.convertGoal(data));
	}

	public async getGoalData(goalId: string): Promise<IGoal> {
		const { data, error } = await this.supabase
			.from('goals')
			.select('*')
			.eq('id', goalId)
			.maybeSingle();
		if (error) throw error;
		if (!data) throw new Error('Goal not found');
		return this.converter.convertGoal(data);
	}

	public async getSharedGoalData(goalId: string): Promise<ISharedGoal> {
		const { data, error } = await this.supabase
			.from('shared_goals')
			.select('*')
			.eq('goal_id', goalId)
			.maybeSingle();
		if (error) throw error;
		if (!data) throw new Error('Shared goal not found');
		if (!isSupabaseSharedGoal(data)) throw new Error('Shared goal row failed type predicate');
		return this.converter.convertSharedGoal(data);
	}

	private async getLastEntry(goalId: string): Promise<IEntry | null> {
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

	private async getActivity(goalId: string): Promise<IActivityInfo> {
		const lastEntry = await this.getLastEntry(goalId);
		if (!lastEntry) {
			return {};
		}
		return {
			lastEntry
		};
	}

	public async getGoalStats(goalId: string): Promise<IGoalStats> {
		const activityInfo = await this.getActivity(goalId);

		const currentStreakInfo = await this.getCurrentStreak({ goalId });

		const recordStreakInfo = await this.getRecordStreak({ goalId });

		return {
			activity: activityInfo,
			streak: currentStreakInfo ?? null,
			record: recordStreakInfo ?? null
		};
	}

	async getGoalInfo(goalId: string): Promise<IGoalInfo> {
		const goalData = await this.getGoal(goalId);

		const relatedGoalData = await this.getGoalStats(goalId);

		return {
			...goalData.toJson(),
			...relatedGoalData
		};
	}

	async getSharedGoalInfo(goalId: string): Promise<ISharedGoalInfo> {
		const goalData = await this.getSharedGoalData(goalId);

		const relatedGoalData = await this.getGoalStats(goalId);

		return {
			...goalData,
			...relatedGoalData
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

	async getEntry(entryId: string): Promise<IEntry> {
		const { data, error } = await this.supabase
			.from('entries')
			.select('*')
			.eq('id', entryId)
			.single();
		if (error) {
			throw error;
		}
		return this.converter.convertEntry(data);
	}

	async getEntriesPaginated(
		goalId: string,
		{ pageSize, exclusiveStartKey }: PaginatedRequest<string>
	): Promise<PaginatedResponse<IEntry, string>> {
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
			items: requestedPage,
			hasMore,
			lastKey: requestedPage[requestedPage.length - 1]?.dateOf ?? undefined
		};
	}

	async createGoal({ title }: CreateGoalParams): Promise<CreateGoalResult> {
		const { data, error } = await this.supabase.rpc('create_goal', { _title: title });
		if (error) {
			throw error;
		}
		return { id: data?.id, title };
	}

	async createEntry({
		goalId,
		dateOf,
		success,
		textContent
	}: CreateEntryParams): Promise<CreateEntryResult> {
		const { data, error } = await this.supabase.rpc('create_entry', {
			_goal_id: goalId,
			_date_of: toUTCString(dateOf),
			_success: success,
			_text_content: textContent ?? undefined
		});
		if (error) throw error;
		return this.converter.convertEntry(data);
	}

	async updateEntry(
		id: string,
		{ textContent, dateOf, success }: UpdateEntryParams
	): Promise<UpdateEntryResult> {
		const { data, error } = await this.supabase.rpc('update_entry', {
			_entry_id: id,
			_update_values: stripUndefined({
				text_content: textContent,
				date_of: dateOf ? toUTCString(dateOf) : undefined,
				success: success
			})
		});
		if (error) throw error;
		return this.converter.convertEntry(data);
	}

	async shareGoal({ goalId, withUser }: ShareGoalParams): Promise<void> {
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
	}: getCurrentStreakParams): Promise<ICurrentStreakInfo | null> {
		const { data, error } = await this.supabase.rpc('get_current_streak_info', {
			_goal_id: goalId
		});
		if (error) throw error;
		if (!data || isSupabaseCurrentStreakInfoNull(data)) return null;
		if (!isSupabaseCurrentStreakInfoNotNull(data))
			throw new Error('Current streak info failed type predicate');
		return this.converter.convertCurrentStreakInfo(data);
	}

	private async getRecordStreak({ goalId }: { goalId: string }): Promise<IStreakInfo | null> {
		const { data, error } = await this.supabase
			.from('streak_summary')
			.select('*')
			.eq('goal', goalId)
			.order('streak_count', { ascending: false })
			.limit(1)
			.maybeSingle();

		if (error) throw error;
		if (!data || isSupabaseStreakInfoNull(data)) return null;
		if (!isSupabaseStreakInfoNotNull(data)) throw new Error('Streak info failed type predicate');
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
			const userProfile = this.converter.convertUserProfile(user);
			return this.converter.convertShareRecord(userProfile, record);
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
			items: requestedPage,
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
			if (!isSupabaseSharedGoalPreview(sharedGoalRow)) {
				throw new Error('Shared goal preview failed type predicate');
			}
			return this.converter.convertSharedGoalPreview(sharedGoalRow);
		});
	}

	private async listSharedGoalsWithUser(user: UserProfile): Promise<ISharedGoal[]> {
		const { data, error } = await this.supabase
			.from('shared_goals')
			.select('*')
			.eq('shared_with', user.id);
		if (error) throw error;
		if (!data) return [];
		return data.map((sharedGoalRow) => {
			if (!isSupabaseSharedGoal(sharedGoalRow)) {
				throw new Error('Shared goal failed type predicate');
			}
			return this.converter.convertSharedGoal(sharedGoalRow);
		});
	}

	async listSharedGoalInfosWithUser(user: UserProfile): Promise<ISharedGoalInfo[]> {
		const sharedGoals = await this.listSharedGoalsWithUser(user);
		return Promise.all(sharedGoals.map((sharedGoal) => this.getSharedGoalInfo(sharedGoal.id)));
	}
}
