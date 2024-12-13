import type { GoalInfo } from '$lib/model/goals';
import type { AuthService } from '$lib/services/AuthService.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { LoadablePresenter } from '../LoadablePresenter.svelte';

export class GoalsPagePresenter extends LoadablePresenter {
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
		errorService: ErrorService,
		private goalService: GoalService
	) {
		super(errorService);
	}

	async loadResource(): Promise<void> {
		await this.loadGoals();
	}

	async loadGoals() {
		await this.doErrorable({
			action: async () => {
				this.loadingGoals = true;

				if (!this.user) {
					throw new Error('Tried to get goals without a signed in user');
				}

				const goals = await this.goalService.listGoalInfos(this.user.id);
				this.goals = goals;
			}, onFinally: () => {
				this.loadingGoals = false;
			}
		})
	}
}
