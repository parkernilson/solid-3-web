import type { GoalRoutePresenter } from "./GoalRoutePresenter.svelte";

export class GoalPagePresenter {
    get goalInfo() { return this.goalRoutePresenter.goalInfo }
    get isOwner() { return this.goalRoutePresenter.isOwner }

	constructor(private goalRoutePresenter: GoalRoutePresenter) {}
}