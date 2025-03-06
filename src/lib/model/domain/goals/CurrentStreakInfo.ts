import { StreakInfo, type IStreakInfo } from './StreakInfo';

export interface ICurrentStreakInfo extends IStreakInfo {
	currentPeriodSuccess: boolean;
}

export class CurrentStreakInfo extends StreakInfo {
	get currentPeriodSuccess(): boolean {
		return this._currentPeriodSuccess;
	}
	constructor(
		startDate: string,
		endDate: string,
		streakCount: number,
		private _currentPeriodSuccess: boolean
	) {
		super(startDate, endDate, streakCount);
	}

	toJson(): ICurrentStreakInfo {
		return {
			...super.toJson(),
			currentPeriodSuccess: this.currentPeriodSuccess
		};
	}

	static fromJson(json: ICurrentStreakInfo): CurrentStreakInfo {
		return new CurrentStreakInfo(
			json.startDate,
			json.endDate,
			json.streakCount,
			json.currentPeriodSuccess
		);
	}
}
