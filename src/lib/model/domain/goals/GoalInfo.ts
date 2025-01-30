import { Optimistic, type IOptimistic } from "$lib/model/domain/Optimistic";
import type { ICurrentStreakInfo } from "./CurrentStreakInfo";
import type { IEntry } from "./Entry";
import { type IGoal } from "./Goal";
import type { IStreakInfo } from "./StreakInfo";

export interface ActivityInfo {
    lastEntry?: IEntry;
}

export type IGoalInfo = IGoal & {
    streak?: ICurrentStreakInfo | null;
    record?: IStreakInfo | null;
    activity?: ActivityInfo;
} & IOptimistic;

export class GoalInfo {
    static createOptimisticJson(userId: string, currentDate: Date, title: string): IGoalInfo {
        return {
            id: Optimistic.getTempId(),
            owner: userId,
            title,
            startDate: currentDate.toISOString(),
        }
    }
}