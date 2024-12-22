import type { GoalInfo } from "$lib/model/domain/goals";
import type { ErrorService } from "$lib/services/ErrorService.svelte";
import type { GoalService } from "$lib/services/GoalService.svelte";
import { LoadablePresenter } from "../LoadablePresenter.svelte";

export class GoalRoutePresenter extends LoadablePresenter<{ goalId: string }> {
    private _goal = $state<GoalInfo>();

    get goal() { return this._goal }
    private set goal(g) { this._goal = g }

	constructor(private goalService: GoalService, errorService: ErrorService) {
        super(errorService);
    }

    protected async loadResource({ goalId }: { goalId: string }): Promise<void> {
        this.goal = await this.goalService.getGoalInfo(goalId)
    }
}