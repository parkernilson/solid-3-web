import type { GoalInfo } from "$lib/model/domain/goals";
import { diffDays, today } from "$lib/utils/dates";

export class GoalListViewPresenter {
    get title() {
        return this.goalInfo.goal.title;
    }

    get streakString() {
        return `${this.goalInfo.streak?.streakCount ?? 0} days`;
    }

    get lastActivityMessage() {
        return this.goalInfo.activity.lastEntry?.dateOf ?
        `Last activity ${diffDays(today(), this.goalInfo.activity.lastEntry.dateOfObject)} days ago`
        : "No activity yet";
    }

    constructor(private goalInfo: GoalInfo) {}
}