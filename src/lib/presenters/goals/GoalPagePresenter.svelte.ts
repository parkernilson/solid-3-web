import { isSharedGoalInfo } from '$lib/model/domain/goals';
import type { GoalRoutePresenter } from './GoalRoutePresenter.svelte';

export class GoalPagePresenter {
	get goalInfo() {
		return this.goalRoutePresenter.goalInfo;
	}
	get isOwner() {
		return this.goalRoutePresenter.isOwner;
	}

	get sharedGoalInfo() {
        if (!this.goalInfo || !isSharedGoalInfo(this.goalInfo)) return null;
		return this.goalInfo;
	}

	constructor(private goalRoutePresenter: GoalRoutePresenter) {}
}
