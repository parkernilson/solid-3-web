import type { GoalInfo } from '$lib/model/goals';
import type { AuthService } from '$lib/services/AuthService.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';

export class GoalsPagePresenter {
	private _loadingGoals = $state(true);
	private _goals = $state<GoalInfo[]>();

	public get loadingGoals() {
		return this._loadingGoals;
	}
	private set loadingGoals(l) {
		this._loadingGoals = l;
	}
	public get goals() {
		return this._goals;
	}
	private set goals(g) {
		this._goals = g;
	}
	public get user() {
		return this.authService.user;
	}

	constructor(
		private authService: AuthService,
		private errorService: ErrorService,
		private goalService: GoalService
	) {}

	async load() {
		try {
			await this.loadGoals();
		} catch (e) {
			this.errorService.reportError(e);
		}
	}

	async loadGoals() {
		try {
			this.loadingGoals = true;

			if (!this.user) {
				throw new Error('Tried to get goals without a signed in user');
			}

			const goals = await this.goalService.listGoalInfos(this.user.id);
			this.goals = goals;
		} catch (e) {
			this.errorService.reportError(e);
		} finally {
			this.loadingGoals = false;
		}
	}
}
