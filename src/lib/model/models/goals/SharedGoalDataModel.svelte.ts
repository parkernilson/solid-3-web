import type { ISharedGoal, ISharedGoalInfo } from "$lib/model/domain/goals";
import type { GoalService } from "$lib/services/GoalService.svelte";
import { DataModel } from "../base/DataModel.svelte";

export class SharedGoalDataModel extends DataModel<ISharedGoal, string> {
    constructor(
        private goalService: GoalService,
        id: string,
        initialData?: ISharedGoalInfo,
    ) {
        super(id, { initialData });
    }

    protected async loadData(): Promise<ISharedGoalInfo> {
        return this.goalService.getSharedGoalData(this.id);
    }
}
