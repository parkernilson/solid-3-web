import type { Entry, GoalInfo, UserProfile } from '$lib/model/domain/goals';
import type { ShareRecord } from '$lib/model/domain/goals/ShareRecord';
import type { PaginatedResponse } from '$lib/utils/types/pagination/PaginatedReponse';
import type { PaginatedRequest } from '$lib/utils/types/pagination/PaginatedRequest';

export interface CreateGoalParams {
    title: string;
}

export interface CreateGoalResult {
    id: string;
    title: string;
}

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

export type UnshareGoalParams = ShareGoalParams;

export interface AcceptSharedGoalParams {
    goalId: string;
}

export interface getCurrentStreakParams {
    goalId: string;
}

export interface GoalService {
	getGoalInfo(goalId: string): Promise<GoalInfo>;
	listGoalInfos(userId: string): Promise<GoalInfo[]>;
	getEntriesPaginated(
		goalId: string,
		{ pageSize, exclusiveStartKey }: PaginatedRequest<string>
	): Promise<PaginatedResponse<Entry>>;
    createGoal(params: CreateGoalParams): Promise<CreateGoalResult>;
    upsertEntry(params: UpsertEntryParams): Promise<UpsertEntryResult>;
    shareGoal(params: ShareGoalParams): Promise<void>;
    unshareGoal(params: UnshareGoalParams): Promise<void>;
    acceptSharedGoal(params: AcceptSharedGoalParams): Promise<void>;
    getSharedWithUsers(goalId: string): Promise<ShareRecord[]>;
    getUsersPaginated(
        searchTerm: string,
        excludeSelf: boolean,
        { pageSize, exclusiveStartKey }: PaginatedRequest<string>
    ): Promise<PaginatedResponse<UserProfile>>;
}
