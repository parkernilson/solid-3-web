import type { ICurrentStreakInfo } from "./CurrentStreakInfo";
import type { IEntry } from "./Entry";
import type { IStreakInfo } from "./StreakInfo";

export interface IGoalStats {
    activity?: IActivityInfo;
    streak?: ICurrentStreakInfo | null;
    record?: IStreakInfo | null;
}

export interface IActivityInfo {
	lastEntry?: IEntry;
}