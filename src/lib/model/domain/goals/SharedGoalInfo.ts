import type { OptimisticType } from "../Optimistic";
import type { ICurrentStreakInfo } from "./CurrentStreakInfo";
import { GoalInfo, type ActivityInfo, type IGoalInfo } from "./GoalInfo";
import type { ISharedGoal } from "./SharedGoal";
import type { IStreakInfo } from "./StreakInfo";

export type ISharedGoalInfo = IGoalInfo & ISharedGoal;

export const isSharedGoalInfo = (goal: IGoalInfo | ISharedGoalInfo): goal is ISharedGoalInfo => {
    return "sharedOn" in goal;
}

export class SharedGoalInfo extends GoalInfo {
    constructor(
        id: string,
        title: string,
        owner: string,
        startDate: string,
        public sharedOn: string,
        public ownerEmail: string,
        streak?: ICurrentStreakInfo | null,
        record?: IStreakInfo | null,
        activity?: ActivityInfo,
        optimisticLocal?: OptimisticType
    ) {
        super(id, title, owner, startDate, streak, record, activity, optimisticLocal);
    }
}