import { GoalInfo, type IGoalInfo } from "$lib/model/domain/goals";
import { isSharedGoalInfo, type ISharedGoalInfo } from "$lib/model/domain/goals/SharedGoalInfo";
import { diffDays, today } from "$lib/utils/dates";

export class GoalListViewPresenter {
    
    get title() {
        return this.goalInfo.title;
    }

    get streakString() {
        return `${this.goalInfo.streak?.streakCount ?? 0} days`;
    }

    get lastActivityMessage() {
        const goalInfoObj = GoalInfo.fromJson(this.goalInfo);
        return goalInfoObj.lastEntryDate ?
        `Last activity ${diffDays(today(), goalInfoObj.lastEntryDate)} days ago`
        : "No activity yet";
    }

    get sharedBy() {
        return isSharedGoalInfo(this.goalInfo) ? this.goalInfo.ownerEmail : undefined;
    }

    constructor(private goalInfo: IGoalInfo | ISharedGoalInfo) {}
}