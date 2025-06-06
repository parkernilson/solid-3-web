import { DateEx } from '$lib/utils/dates';
import { Optimistic } from '../Optimistic';

export interface IGoal {
	id: string;
	owner: string;
	title: string;
	startDate: string;
}

export type GoalCreateParams = Pick<IGoal, 'owner' | 'title' | 'startDate'>;
export type GoalUpdateOptimisticParams = Pick<IGoal, 'owner' | 'title' | 'startDate'>;

export class Goal implements IGoal {
	constructor(
		public id: string,
		public owner: string,
		public title: string,
		public startDate: string
	) {}
	get startDateObj(): DateEx {
		return DateEx.fromISODateOnly(this.startDate);
	}

	toJson(): IGoal {
		return {
			id: this.id,
			owner: this.owner,
			title: this.title,
			startDate: this.startDate
		};
	}

	static fromJson(json: IGoal): Goal {
		return new Goal(json.id, json.owner, json.title, json.startDate);
	}

	static getDefaultGoalValues(): Required<Pick<Goal, 'title'>> & Partial<Goal> {
		return {
			title: 'Untitled Goal'
		};
	}

	static createOptimistic(
		params: Omit<GoalCreateParams, 'startDate'> & Partial<GoalCreateParams>
	): IGoal {
		return {
			...params,
			id: Optimistic.getTempId(),
			startDate: params.startDate ?? DateEx.todayDate().toISODateOnlyString()
		};
	}

	static applyUpdateOptimistic(original: IGoal, params: GoalUpdateOptimisticParams): IGoal {
		return {
			...original,
			...params
		};
	}
}
