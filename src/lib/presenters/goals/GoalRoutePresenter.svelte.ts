import type { GoalDataModel } from "$lib/model/models/goals/GoalDataModel.svelte";
import type { SharedGoalDataModel } from "$lib/model/models/goals/SharedGoalDataModel.svelte";
import type { ErrorService } from "$lib/services/ErrorService.svelte";
import { LoadablePresenter } from "../LoadablePresenter.svelte";

export class GoalRoutePresenter extends LoadablePresenter {
    get goal() { return this.goalModel.data }

	constructor(errorService: ErrorService, private goalModel: GoalDataModel | SharedGoalDataModel) {
        super(errorService);
    }

    protected async loadResource(): Promise<void> {
        await this.goalModel.sendLoad();
    }
}