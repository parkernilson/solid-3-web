import { GoalInfo, type IGoalInfo } from '$lib/model/domain/goals';
import { isSharedGoalInfo } from '$lib/model/domain/goals/SharedGoalInfo';
import type { GoalInfoDataModel } from '$lib/model/models/goals/GoalInfoDataModel.svelte';
import type { SharedGoalInfoDataModel } from '$lib/model/models/goals/SharedGoalInfoDataModel.svelte';
import { Routes } from '$lib/model/routes';
import type { ProfileService } from '$lib/services/ProfileService.svelte';
import { diffDays, today } from '$lib/utils/dates';

export class GoalListViewPresenter {
	get optimistic() {
		return this.goalInfoModel.optimistic;
	}

	get title() {
		return this.goalInfo.title;
	}

	get streakString() {
		return `${this.goalInfo.streak?.streakCount ?? 0} days`;
	}

	get lastActivityMessage() {
		const goalInfoObj = GoalInfo.fromJson(this.goalInfo);
		return goalInfoObj.lastEntryDate
			? `Last activity ${diffDays(today(), goalInfoObj.lastEntryDate)} days ago`
			: 'No activity yet';
	}

	get isSharedGoal() {
		return isSharedGoalInfo(this.goalInfo);
	}

	get sharedBy() {
		return isSharedGoalInfo(this.goalInfo) ? this.goalInfo.ownerEmail : undefined;
	}

	get goalPageUrl() {
		return isSharedGoalInfo(this.goalInfo)
			? Routes.getGoalPageUrl(this.goalInfo.id, true)
			: Routes.getGoalPageUrl(this.goalInfo.id, false);
	}

	get goalOwnerId(): string | undefined {
		if (isSharedGoalInfo(this.goalInfo)) {
			return this.goalInfo.owner;
		} else {
			return undefined;
		}
	}

	get ownerProfileImagePath(): string | undefined {
		if (isSharedGoalInfo(this.goalInfo)) {
			return this.goalInfo.ownerProfileImagePath;
		} else {
			return undefined;
		}
	}

	constructor(
		private goalInfo: IGoalInfo,
		private goalInfoModel: GoalInfoDataModel | SharedGoalInfoDataModel,
		private profileService: ProfileService
	) { }
}
