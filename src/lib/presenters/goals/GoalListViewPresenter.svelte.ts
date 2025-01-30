import type { IGoalInfo } from "$lib/model/domain/goals";
import { diffDays, today } from "$lib/utils/dates";

export class GoalListViewPresenter {
    

    get title() {
        return this.goalInfo.title;
    }

    get streakString() {
        return `${this.goalInfo.streak?.streakCount ?? 0} days`;
    }

    get lastActivityMessage() {
        return this.goalInfo.activity?.lastEntry?.dateOf ?
        // TODO: Convert the goal info JSON object to a class object and use the dateOf property
        `Last activity ${diffDays(today(), new Date(this.goalInfo.activity.lastEntry.dateOf))} days ago`
        : "No activity yet";
    }

    constructor(private goalInfo: IGoalInfo) {}
}