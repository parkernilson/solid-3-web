import type { AuthModel } from '$lib/model/models/AuthModel.svelte';
import type { GoalsModel } from '$lib/model/models/GoalsModel.svelte';
import type { AuthService } from '$lib/services/AuthService.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { ErrorHandler } from '../ErrorHandler';

export class GoalsPagePresenter extends ErrorHandler {
	goalsModel?: GoalsModel
	private _goalsSorted = $derived(
		this.goalsModel?.goals ?
			Object.values(this.goalsModel.goals)
			: undefined
	)

	public get goals() {
		return this._goalsSorted
	}
	public get sharedGoalsWithMe() {
		return this.goalsRoutePresenter.sharedGoalsWithMe
	}
	public get sharedGoalsWithMePending() {
		return this.goalsRoutePresenter.sharedGoalsWithMePending;
	}
	public get user() {
		return this.authService.user;
	}

	constructor(
		private authService: AuthService,
		errorService: ErrorService,
		authModel: AuthModel,
		goalsModel: GoalsModel 
	) {
		super(errorService);
		this.authModel = authModel
		this.goalsModel = goalsModel
	}
}
