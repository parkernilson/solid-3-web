import type { IGoalStats } from "$lib/model/domain/goals/GoalStats";
import type { GoalService } from "$lib/services/GoalService.svelte";
import { DataModel } from "../base/DataModel.svelte";

export class GoalStatsDataModel extends DataModel<IGoalStats, string> {
    constructor(
        private goalService: GoalService,
        goalId: string,
        initialData?: IGoalStats
    ) {
        super(goalId, { initialData });
    }

    protected loadData(): Promise<IGoalStats> {
        return this.goalService.getGoalStats(this.id);
    }
}