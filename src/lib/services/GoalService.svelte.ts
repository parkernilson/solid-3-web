import type {
	IEntry,
	IGoal,
	IGoalInfo,
	IGoalStats,
	ISharedGoal,
	ISharedGoalInfo,
	ISharedGoalPreview
} from '$lib/model/domain/goals';
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

export interface CreateEntryParams {
	goalId: string;
	textContent?: string | null;
	dateOf: string;
	success: boolean;
}

export type CreateEntryResult = IEntry;

/** Null values will set the value to null, undefined values will be ignored */
export interface UpdateEntryParams {
	textContent?: string | null;
	dateOf?: string;
	success?: boolean;
}

export type UpdateEntryResult = IEntry;

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
	getEntry(entryId: string): Promise<IEntry>;
	getEntriesPaginated(
		goalId: string,
		{ pageSize, exclusiveStartKey }: PaginatedRequest<string>
	): Promise<PaginatedResponse<IEntry, string>>;
	createGoal(params: CreateGoalParams): Promise<CreateGoalResult>;
	createEntry(params: CreateEntryParams): Promise<CreateEntryResult>;
	updateEntry(id: string, params: UpdateEntryParams): Promise<UpdateEntryResult>;
	deleteEntry(id: string): Promise<void>;
	shareGoal(params: ShareGoalParams): Promise<void>;
	rejectSharedGoal(params: RejectSharedGoalParams): Promise<void>;
	unshareGoal(params: UnshareGoalParams): Promise<void>;
	acceptSharedGoal(params: AcceptSharedGoalParams): Promise<void>;
	getSharedWithUsers(goalId: string): Promise<ShareRecord[]>;
	getUsersPaginated(
		searchTerm: string,
		{ pageSize, exclusiveStartKey }: PaginatedRequest<string>,
		excludeUserId?: string
	): Promise<PaginatedResponse<UserProfile>>;
	listShareRecords(user: UserProfile): Promise<ShareRecord[]>;
	listSharedGoalPreviewsWithUser(user: UserProfile): Promise<ISharedGoalPreview[]>;
	listSharedGoalInfosWithUser(user: UserProfile): Promise<ISharedGoalInfo[]>;
}
