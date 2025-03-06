import { Optimistic } from '$lib/model/domain/Optimistic';
import { compareNullable } from '$lib/utils/compare';
import { DateEx } from '$lib/utils/dates';
import { Goal, type IGoal } from './Goal';
import type { IGoalStats } from './GoalStats';

export type IGoalInfo = IGoal & IGoalStats;

export class GoalInfo extends Goal implements IGoalInfo {
	constructor(
		id: string,
		title: string,
		owner: string,
		startDate: string,
		public goalStats: IGoalStats
	) {
		super(id, title, owner, startDate);
	}

	toJson(): IGoalInfo {
		return {
			...super.toJson(),
			streak: this.goalStats.streak,
			record: this.goalStats.record,
			activity: this.goalStats.activity
		};
	}

	static fromJson(json: IGoalInfo): GoalInfo {
		return new GoalInfo(json.id, json.title, json.owner, json.startDate, {
			streak: json.streak,
			record: json.record,
			activity: json.activity
		});
	}

	get lastEntryDate(): DateEx | undefined {
		return this.goalStats.activity?.lastEntry?.dateOf
			? DateEx.fromISODateOnly(this.goalStats.activity.lastEntry.dateOf)
			: undefined;
	}

	static createOptimisticJson(userId: string, currentDate: DateEx, title: string): IGoalInfo {
		return {
			id: Optimistic.getTempId(),
			owner: userId,
			title,
			startDate: currentDate.toISODateOnlyString()
		};
	}

	static compareActivity(a: GoalInfo, b: GoalInfo): number {
		return compareNullable(DateEx.compare)(a.lastEntryDate, b.lastEntryDate);
	}

	static compareActivityJson(a: IGoalInfo, b: IGoalInfo): number {
		return GoalInfo.compareActivity(GoalInfo.fromJson(a), GoalInfo.fromJson(b));
	}

	static compareStartDate(a: GoalInfo, b: GoalInfo): number {
		return DateEx.compare(a.startDateObj, b.startDateObj);
	}

	static compareStartDateJson(a: IGoalInfo, b: IGoalInfo): number {
		return GoalInfo.compareStartDate(GoalInfo.fromJson(a), GoalInfo.fromJson(b));
	}
}
