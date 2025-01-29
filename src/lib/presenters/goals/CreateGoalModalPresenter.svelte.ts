import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { ErrorHandler } from '$lib/utils/ErrorHandler';
import type { GoalsRoutePresenter } from './GoalsRoutePresenter.svelte';

export class CreateGoalModalPresenter extends ErrorHandler {
	title = $state<string>();

	constructor(
		errorService: ErrorService,
		private goalsRoutePresenter: GoalsRoutePresenter,
	) {
		super(errorService);
	}

	async createGoal() {
		// TODO: use a goal collection model in the goals route and do an optimistic update
		console.log("create goal ", this.title)
	}
}
