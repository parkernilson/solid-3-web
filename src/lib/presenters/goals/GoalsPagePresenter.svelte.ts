import type { AuthService } from '$lib/services/AuthService.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { ErrorHandler } from '../../utils/ErrorHandler';
import type { GoalsRoutePresenter } from './GoalsRoutePresenter.svelte';

export class GoalsPagePresenter extends ErrorHandler {

	public get goals() {
		return this.goalsRoutePresenter.goals;
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
		private goalsRoutePresenter: GoalsRoutePresenter
	) {
		super(errorService);
	}
}
