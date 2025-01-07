import type { CurrentStreakInfo } from "./CurrentStreakInfo";
import type { Entry } from "./Entry";
import type { Goal } from "./Goal";
import type { StreakInfo } from "./StreakInfo";

export interface ActivityInfo {
    lastEntry?: Entry;
}

export interface GoalInfo {
    goal: Goal;
    streak: CurrentStreakInfo | null;
    record: StreakInfo | null;
    activity: ActivityInfo;
}