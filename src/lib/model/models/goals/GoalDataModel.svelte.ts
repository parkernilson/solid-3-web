import type { IGoal, IGoalInfo } from "$lib/model/domain/goals";
import type { GoalService } from "$lib/services/GoalService.svelte";
import { DataModel, type DataModelInit } from "../base/DataModel.svelte";

export class GoalDataModel extends DataModel<IGoal> {
    constructor(
        private goalService: GoalService,
        private goalId: string,
        init: DataModelInit<IGoal>
    ) {
        super(goalId, init);
    }

    protected async loadData(): Promise<IGoalInfo> {
        return this.goalService.getGoalData(this.goalId);
    }
}
