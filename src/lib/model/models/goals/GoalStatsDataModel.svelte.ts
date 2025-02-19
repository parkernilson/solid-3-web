import type { IGoalStats } from "$lib/model/domain/goals/GoalStats";
import { DataModel } from "../base/DataModel.svelte";

export class GoalStatsDataModel extends DataModel<IGoalStats> {
    sendLoad(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    protected sendUpdate(): Promise<IGoalStats> {
        throw new Error("Cannot update goal stats.");
    }
}