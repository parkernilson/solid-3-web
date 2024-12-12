import type { Entry, GoalInfo } from "$lib/model/goals";
import type { ErrorService } from "$lib/services/ErrorService.svelte";
import type { GoalService } from "$lib/services/GoalService.svelte";

export class GoalPagePresenter {
	private _loadingPage = $state(true);
    private _goal = $state<GoalInfo>();
    private _entries = $state<Entry[]>();

    get loadingPage() { return this._loadingPage }
    private set loadingPage(v) { this._loadingPage = v }
    get goal() { return this._goal }
    private set goal(g) { this._goal = g }
    get entries() { return this._entries }
    private set entries(e) { this._entries = e }

	constructor(private goalService: GoalService, private errorService: ErrorService) {}

    async loadPage(goalId: string) {
        try {
            this.loadingPage = true
            const goal = await this.goalService.getGoalInfo(goalId)
            this.goal = goal
            // TODO: re enable the initial entries loading
            // const { data: entriesData, error: entriesError } = await this.goalService.getEntries(goalId)
            // if (entriesError) throw entriesError
            this.entries = []
        } catch(e) {
            this.errorService.reportError(e)
        } finally {
            this.loadingPage = false
        }
    }
}