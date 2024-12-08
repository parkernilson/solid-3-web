import type { GoalWithStreak } from '$lib/model/goals';
import { AuthService } from '$lib/services/AuthService.svelte';
import { ErrorService } from '$lib/services/ErrorService.svelte';
import { GoalService } from '$lib/services/GoalService.svelte';

export class GoalsPagePresenter {
	private authService: AuthService;
	private goalService: GoalService;
	private errorService: ErrorService;
	
	private _loadingGoals = $state(true);
	private _goals = $state<GoalWithStreak[]>();
	
	public get loadingGoals() { return this._loadingGoals }
	private set loadingGoals(l) { this._loadingGoals = l }
	public get goals() { return this._goals }
	private set goals(g) { this._goals = g }

	public get user() {
		return this.authService.user;
	}

	constructor(authService: AuthService, errorService: ErrorService, goalService: GoalService) {
		this.authService = authService;
		this.errorService = errorService;
		this.goalService = goalService;
	}

	static make() {
		return new GoalsPagePresenter(AuthService.instance(), ErrorService.instance(), GoalService.make());
	}

	async load() {
		try {
			await this.loadGoals()
		} catch(e) {
			this.errorService.reportError(e)
		}
	}

	async loadGoals() {
		try {
			this.loadingGoals = true;

			if (!this.user) {
				throw new Error("Tried to get goals without a signed in user")
			}
		
			const goals = await this.goalService.getGoalsWithStreaks(this.user.id);
			this.goals = goals;
		} catch (e) {
			this.errorService.reportError(e);
		} finally {
			this.loadingGoals = false
		}
	}
}
