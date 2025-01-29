export interface IStreakInfo {
    startDate: string;
    endDate: string;
    streakCount: number;
}

export class StreakInfo {
    get startDate(): Date {
        return typeof this._startDate === 'string' ? new Date(this._startDate) : this._startDate;
    }
    get endDate(): Date {
        return typeof this._endDate === 'string' ? new Date(this._endDate) : this._endDate;
    }
    get streakCount(): number {
        return this._streakCount;
    }

	constructor(
		private _startDate: Date | string,
		private _endDate: Date | string,
		private _streakCount: number
	) {}

    toJson(): IStreakInfo {
        return {
            startDate: this.startDate.toISOString(),
            endDate: this.endDate.toISOString(),
            streakCount: this.streakCount,
        }
    }

    static fromJson(json: IStreakInfo): StreakInfo {
        return new StreakInfo(json.startDate, json.endDate, json.streakCount);
    }
}