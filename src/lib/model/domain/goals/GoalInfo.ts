import { Optimistic, OptimisticType, type IOptimistic } from '$lib/model/domain/Optimistic';
import { compareDates } from '$lib/utils/compare/compare-dates';
import type { ICurrentStreakInfo } from './CurrentStreakInfo';
import type { IEntry } from './Entry';
import { Goal, type IGoal } from './Goal';
import type { IStreakInfo } from './StreakInfo';

export interface ActivityInfo {
	lastEntry?: IEntry;
}

export type IGoalInfo = IGoal & {
	streak?: ICurrentStreakInfo | null;
	record?: IStreakInfo | null;
	activity?: ActivityInfo;
} & IOptimistic;

export class GoalInfo extends Goal implements IGoalInfo {
	constructor(
		id: string,
		title: string,
		owner: string,
		startDate: string,
		public streak?: ICurrentStreakInfo | null,
		public record?: IStreakInfo | null,
		public activity?: ActivityInfo,
		public optimisticLocal?: OptimisticType
	) {
		super(id, title, owner, startDate);
	}

    toJson(): IGoalInfo {
        return {
            ...super.toJson(),
            streak: this.streak,
            record: this.record,
            activity: this.activity,
            optimisticLocal: this.optimisticLocal
        };
    }

    static fromJson(json: IGoalInfo): GoalInfo {
        return new GoalInfo(
            json.id,
            json.title,
            json.owner,
            json.startDate,
            json.streak,
            json.record,
            json.activity,
            json.optimisticLocal
        );
    }

	get lastEntryDate(): Date | undefined {
		return this.activity?.lastEntry?.dateOf ? new Date(this.activity.lastEntry.dateOf) : undefined;
	}

	static createOptimisticJson(userId: string, currentDate: Date, title: string): IGoalInfo {
		return {
			id: Optimistic.getTempId(),
			owner: userId,
			title,
			startDate: currentDate.toISOString()
		};
	}

	static compareActivity(a: GoalInfo, b: GoalInfo): number {
        return compareDates(a.lastEntryDate, b.lastEntryDate);
	}

    static compareActivityJson(a: IGoalInfo, b: IGoalInfo): number {
        return GoalInfo.compareActivity(GoalInfo.fromJson(a), GoalInfo.fromJson(b));
    }

    static compareStartDate(a: GoalInfo, b: GoalInfo): number {
        return compareDates(a.startDateObj, b.startDateObj);
    }

    static compareStartDateJson(a: IGoalInfo, b: IGoalInfo): number {
        return GoalInfo.compareStartDate(GoalInfo.fromJson(a), GoalInfo.fromJson(b));
    }
}