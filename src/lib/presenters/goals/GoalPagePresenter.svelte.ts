import { ErrorService } from "$lib/services/ErrorService.svelte";
import { type Goal, GoalService } from "$lib/services/GoalService.svelte";

export class GoalPagePresenter {
	private goalService: GoalService;
    private errorService: ErrorService;

	private _loadingGoal = $state(false);
    private _goal = $state<Goal>();

    get loadingGoal() { return this._loadingGoal }
    private set loadingGoal(v) { this._loadingGoal = v }
    get goal() { return this._goal }
    private set goal(g) { this._goal = g }

	constructor(goalService: GoalService, errorService: ErrorService) {
		this.goalService = goalService;
        this.errorService = errorService;
	}

	static make() {
		return new GoalPagePresenter(
            GoalService.make(),
            ErrorService.instance()
        );
	}

    async loadPage(goalId: string) {
        try {
            this.loadingGoal = true
            const { data: goalData, error: goalError } = await this.goalService.getGoal(goalId)
            if (goalError) throw goalError
            if (!goalData) throw new Error("That goal could not be found")
            this.goal = goalData
            this.loadingGoal = false
        } catch(e) {
            this.errorService.reportError(e)
        }
    }
}