import type { GoalRoutePresenter } from "./GoalRoutePresenter.svelte";

export class GoalPagePresenter {
    get goal() { return this.goalRoutePresenter.goal }

	constructor(private goalRoutePresenter: GoalRoutePresenter) {}
}