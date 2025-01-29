import type { Optimistic } from "$lib/model/domain/Optimistic";
import type { ICurrentStreakInfo } from "./CurrentStreakInfo";
import type { IEntry } from "./Entry";
import type { IGoal } from "./Goal";
import type { IStreakInfo } from "./StreakInfo";

export interface ActivityInfo {
    lastEntry?: IEntry;
}

export type IGoalInfo = {
    id: string;
    goal: IGoal;
    streak: ICurrentStreakInfo | null;
    record: IStreakInfo | null;
    activity: ActivityInfo;
} & Optimistic;