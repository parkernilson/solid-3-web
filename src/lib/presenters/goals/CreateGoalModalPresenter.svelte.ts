import { goto } from '$app/navigation';
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
		await this.doErrorable({
			action: async () => {
				if (!this.title || this.title?.length < 3) {
					throw new Error('Title must be at least 3 characters long');
				}
				await goto('/goals');
				return this.goalsRoutePresenter.goalCollectionModel.createGoal(this.title)
			}
		})
	}
}
