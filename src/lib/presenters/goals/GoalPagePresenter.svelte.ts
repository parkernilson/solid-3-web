import type { GoalInfo } from "$lib/model/domain/goals";
import type { ErrorService } from "$lib/services/ErrorService.svelte";
import type { GoalService } from "$lib/services/GoalService.svelte";
import { LoadablePresenter } from "../LoadablePresenter.svelte";

export class GoalPagePresenter extends LoadablePresenter<{ goalId: string }> {
	private _loadingPage = $state(true);
    private _goal = $state<GoalInfo>();

    get loadingPage() { return this._loadingPage }
    private set loadingPage(v) { this._loadingPage = v }
    get goal() { return this._goal }
    private set goal(g) { this._goal = g }

	constructor(private goalService: GoalService, errorService: ErrorService) {
        super(errorService);
    }

    async loadResource({ goalId }: { goalId: string }): Promise<void> {
        this.goal = await this.goalService.getGoalInfo(goalId)
    }
}