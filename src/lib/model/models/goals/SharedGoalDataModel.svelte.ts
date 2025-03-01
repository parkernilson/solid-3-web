import type { ISharedGoal, ISharedGoalInfo } from "$lib/model/domain/goals";
import type { GoalService } from "$lib/services/GoalService.svelte";
import { DataModel, type DataModelInit } from "../base/DataModel.svelte";

export class SharedGoalDataModel extends DataModel<ISharedGoal> {
    constructor(
        private goalService: GoalService,
        private sharedGoalId: string,
        init: DataModelInit<ISharedGoalInfo>,
    ) {
        super(sharedGoalId, init);
    }

    protected async loadData(): Promise<ISharedGoalInfo> {
        return this.goalService.getSharedGoalData(this.sharedGoalId);
    }
}
