import { DateEx } from '$lib/utils/dates';

export interface IStreakInfo {
	startDate: string;
	endDate: string;
	streakCount: number;
}

export class StreakInfo {
	get startDateObj() {
		return DateEx.fromISODateOnly(this.startDate);
	}
	get endDateObj() {
		return DateEx.fromISODateOnly(this.endDate);
	}

	constructor(
		public startDate: string,
		public endDate: string,
		public streakCount: number
	) {}

	toJson(): IStreakInfo {
		return {
			startDate: this.startDate,
			endDate: this.endDate,
			streakCount: this.streakCount
		};
	}

	static fromJson(json: IStreakInfo): StreakInfo {
		return new StreakInfo(json.startDate, json.endDate, json.streakCount);
	}
}
