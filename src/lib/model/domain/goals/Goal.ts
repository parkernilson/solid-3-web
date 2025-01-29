export interface IGoal {
    id: string;
    owner: string;
    title: string;
    startDate: string;
}

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

    toJson(): IGoal {
        return {
            id: this.id,
            owner: this.owner,
            title: this.title,
            startDate: this.startDate.toISOString(),
        }
    }

    static fromJson(json: IGoal): Goal {
        return new Goal(json.id, json.owner, json.title, json.startDate);
    }

    static getDefaultGoalValues(): Required<Pick<Goal, 'title'>> & Partial<Goal> {
        return {
            title: 'Untitled Goal',
        }
    }
}