import type { ISharedGoal, ISharedGoalInfo } from "$lib/model/domain/goals";
import type { GoalService } from "$lib/services/GoalService.svelte";
import { DataModel } from "../base/DataModel.svelte";

export class SharedGoalDataModel extends DataModel<ISharedGoal> {
    constructor(
        private goalService: GoalService,
        private sharedGoalId: string,
        initialData?: ISharedGoalInfo,
    ) {
        super(sharedGoalId, { initialData });
    }

    protected async loadData(): Promise<ISharedGoalInfo> {
        return this.goalService.getSharedGoalData(this.sharedGoalId);
    }
}
