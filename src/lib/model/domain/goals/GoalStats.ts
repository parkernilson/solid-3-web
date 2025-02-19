import type { OptimisticType } from "../Optimistic";
import type { ICurrentStreakInfo } from "./CurrentStreakInfo";
import type { IEntry } from "./Entry";
import type { IStreakInfo } from "./StreakInfo";

export interface IGoalStats {
    id: string;
    activity?: IActivityInfo;
    streak?: ICurrentStreakInfo | null;
    record?: IStreakInfo | null;
    optimisticLocal?: OptimisticType;
}

export interface IActivityInfo {
	lastEntry?: IEntry;
}