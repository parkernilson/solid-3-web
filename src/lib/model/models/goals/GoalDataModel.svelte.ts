import type { IGoal, IGoalInfo } from "$lib/model/domain/goals";
import type { GoalService } from "$lib/services/GoalService.svelte";
import { DataModel } from "../base/DataModel.svelte";

export class GoalDataModel extends DataModel<IGoal, string> {
    constructor(
        private goalService: GoalService,
        id: string,
        initialData?: IGoal,
    ) {
        super(id, { initialData });
    }

    protected async loadData(): Promise<IGoalInfo> {
        return this.goalService.getGoalData(this.id);
    }
}
