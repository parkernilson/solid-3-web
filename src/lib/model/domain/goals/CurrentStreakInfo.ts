import { StreakInfo } from './StreakInfo';

export class CurrentStreakInfo extends StreakInfo {
	get currentPeriodSuccess(): boolean {
		return this._currentPeriodSuccess;
	}
	constructor(
		startDate: Date | string,
		endDate: Date | string,
		streakCount: number,
		private _currentPeriodSuccess: boolean,
	) {
		super(startDate, endDate, streakCount);
	}
}
