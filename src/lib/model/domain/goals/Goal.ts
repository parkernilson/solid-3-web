export interface IGoal {
    id: string;
    owner: string;
    title: string;
    startDate: string;
}

export class Goal implements IGoal {
    constructor(
        public id: string,
        public owner: string,
        public title: string,
        public startDate: string,
    ) {}
    get startDateObj(): Date {
        return new Date(this.startDate);
    }

    toJson(): IGoal {
        return {
            id: this.id,
            owner: this.owner,
            title: this.title,
            startDate: this.startDate,
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