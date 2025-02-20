import type { IGoal } from "./Goal";
import { GoalInfo, type IGoalInfo } from "./GoalInfo";
import type { IGoalStats } from "./GoalStats";
import type { ISharedGoal } from "./SharedGoal";

export type ISharedGoalInfo = IGoalInfo & ISharedGoal;

export const isSharedGoalInfo = (goal: IGoalInfo | ISharedGoalInfo): goal is ISharedGoalInfo => {
    return "ownerEmail" in goal;
}

export const isSharedGoalData = (goal: IGoal | ISharedGoal): goal is ISharedGoal => {
    return "ownerEmail" in goal;
}

export class SharedGoalInfo extends GoalInfo {
    constructor(
        id: string,
        title: string,
        owner: string,
        startDate: string,
        goalStats: IGoalStats,
        public sharedOn: string,
        public ownerEmail: string,
        public ownerProfileImagePath?: string,
    ) {
        super(id, title, owner, startDate, goalStats);
    }
}