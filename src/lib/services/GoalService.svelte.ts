import type { Entry, IEntry, IGoal, IGoalInfo, IGoalStats, ISharedGoal, ISharedGoalInfo, ISharedGoalPreview } from '$lib/model/domain/goals';
import type { ShareRecord } from '$lib/model/domain/goals/ShareRecord';
import type { UserProfile } from '$lib/model/domain/users';
import type { PaginatedRequest, PaginatedResponse } from '$lib/utils/types';

export interface CreateGoalParams {
    title: string;
}

export interface CreateGoalResult {
    id: string;
    title: string;
}

// TODO: remove all the upsert entry stuff, if it is no longer used in refactor
export interface UpsertEntryParams {
    goalId: string;
    entryId?: string;
    dateOf?: string;
    textContent?: string;
    success?: boolean;
}

export type UpsertEntryResult = Entry;

export interface ShareGoalParams {
    goalId: string;
    withUser: string;
}

export interface RejectSharedGoalParams {
    goalId: string;
}

export type UnshareGoalParams = ShareGoalParams;

export interface AcceptSharedGoalParams {
    goalId: string;
}

export interface getCurrentStreakParams {
    goalId: string;
}

export interface GoalService {
	getGoalInfo(goalId: string): Promise<IGoalInfo>;
    getSharedGoalInfo(goalId: string): Promise<ISharedGoalInfo>;
    getGoalData(goalId: string): Promise<IGoal>;
    getGoalStats(goalId: string): Promise<IGoalStats>;
    getSharedGoalData(goalId: string): Promise<ISharedGoal>;
	listGoalInfos(userId: string): Promise<IGoalInfo[]>;
	getEntriesPaginated(
		goalId: string,
		{ pageSize, exclusiveStartKey }: PaginatedRequest<string>
	): Promise<PaginatedResponse<IEntry, string>>;
    createGoal(params: CreateGoalParams): Promise<CreateGoalResult>;
    // TODO: remove upsert entry stuff if it is no longer used in refactor
    upsertEntry(params: UpsertEntryParams): Promise<UpsertEntryResult>;
    shareGoal(params: ShareGoalParams): Promise<void>;
    rejectSharedGoal(params: RejectSharedGoalParams): Promise<void>;
    unshareGoal(params: UnshareGoalParams): Promise<void>;
    acceptSharedGoal(params: AcceptSharedGoalParams): Promise<void>;
    getSharedWithUsers(goalId: string): Promise<ShareRecord[]>;
    getUsersPaginated(
        searchTerm: string,
        { pageSize, exclusiveStartKey }: PaginatedRequest<string>,
        excludeUserId?: string,
    ): Promise<PaginatedResponse<UserProfile>>;
    listShareRecords(user: UserProfile): Promise<ShareRecord[]>;
    listSharedGoalPreviewsWithUser(user: UserProfile): Promise<ISharedGoalPreview[]>;
    listSharedGoalInfosWithUser(user: UserProfile): Promise<ISharedGoalInfo[]>;
}
