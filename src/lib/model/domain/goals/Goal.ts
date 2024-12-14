export class Goal {
    constructor(
        private _id: string,
        private _owner: string,
        private _title: string,
        private _startDate: Date | string,
    ) {}
    get id(): string {
        return this._id;
    }
    get owner(): string {
        return this._owner;
    }
    get title(): string {
        return this._title;
    }
    get startDate(): Date {
        return new Date(this._startDate);
    }

    static getDefaultGoalValues(): Required<Pick<Goal, 'title'>> & Partial<Goal> {
        return {
            title: 'Untitled Goal',
        }
    }
}