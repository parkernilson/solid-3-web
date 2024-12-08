import type { Entry, GoalWithStreak } from "$lib/model/goals";
import { ErrorService } from "$lib/services/ErrorService.svelte";
import { GoalService } from "$lib/services/GoalService.svelte";

export class GoalPagePresenter {
	private goalService: GoalService;
    private errorService: ErrorService;

    private shortDateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

	private _loadingPage = $state(true);
    private _goal = $state<GoalWithStreak>();
    private _entries = $state<Entry[]>();
    private _formattedStartDate = $derived(this.goal ? 
        this.shortDateFormatter.format(new Date(this.goal.created_at))
    : null)

    get loadingPage() { return this._loadingPage }
    private set loadingPage(v) { this._loadingPage = v }
    get goal() { return this._goal }
    private set goal(g) { this._goal = g }
    get entries() { return this._entries }
    private set entries(e) { this._entries = e }
    get formattedStartDate() { return this._formattedStartDate }

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
            this.loadingPage = true
            const goal = await this.goalService.getGoalWithStreak(goalId)
            this.goal = goal
            const { data: entriesData, error: entriesError } = await this.goalService.getEntries(goalId)
            if (entriesError) throw entriesError
            this.entries = entriesData
        } catch(e) {
            this.errorService.reportError(e)
        } finally {
            this.loadingPage = false
        }
    }
}