import type { GoalRoutePresenter } from "./GoalRoutePresenter.svelte";

export class ShareGoalPagePresenter {
    get goal() {
        return this.goalRoutePresenter.goal;
    }

    constructor(private goalRoutePresenter: GoalRoutePresenter) {}
}