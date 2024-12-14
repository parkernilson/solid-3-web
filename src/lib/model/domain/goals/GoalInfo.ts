import type { CurrentStreakInfo } from "./CurrentStreakInfo";
import type { Goal } from "./Goal";
import type { StreakInfo } from "./StreakInfo";

export interface GoalInfo {
    goal: Goal;
    streak: CurrentStreakInfo | null;
    record: StreakInfo | null;
}