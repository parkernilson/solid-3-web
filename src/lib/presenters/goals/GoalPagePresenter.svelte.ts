import type { GoalRoutePresenter } from "./GoalRoutePresenter.svelte";

export class GoalPagePresenter {
    get goalInfo() { return this.goalRoutePresenter.goalInfo }

	constructor(private goalRoutePresenter: GoalRoutePresenter) {}
}