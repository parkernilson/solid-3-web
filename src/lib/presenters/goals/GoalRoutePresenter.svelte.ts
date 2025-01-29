import type { GoalModel } from "$lib/model/models/GoalModel.svelte";
import type { ErrorService } from "$lib/services/ErrorService.svelte";
import { LoadablePresenter } from "../LoadablePresenter.svelte";

export class GoalRoutePresenter extends LoadablePresenter {
    get goal() { return this.goalModel.goal }

	constructor(errorService: ErrorService, private goalModel: GoalModel) {
        super(errorService);
    }

    protected async loadResource(): Promise<void> {
        await this.goalModel.loadGoal();
    }
}