import type { GoalRoutePresenter } from './GoalRoutePresenter.svelte';

export class ShareGoalPagePresenter {
	get goal() {
		return this.goalRoutePresenter.goalModel;
	}

	constructor(private goalRoutePresenter: GoalRoutePresenter) {}
}
