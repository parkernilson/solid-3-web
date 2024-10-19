import { GoalService } from "$lib/services/GoalService";

export class GoalPagePresenter {
    private goalService: GoalService;

    readonly goal = $state({ title: "Goal Title" })

    constructor() {
        this.goalService = GoalService.create();
    }

    static create() {
        return new GoalPagePresenter()
    }
}