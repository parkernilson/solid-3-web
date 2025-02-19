import type { IGoalStats } from "$lib/model/domain/goals/GoalStats";
import { DataModel } from "../base/DataModel.svelte";

export class GoalStatsDataModel extends DataModel<IGoalStats> {
    protected loadData(): Promise<IGoalStats> {
        throw new Error("Method not implemented.");
    }
}