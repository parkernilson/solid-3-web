import { goto } from '$app/navigation';
import type { GoalCollectionModel } from '$lib/model/models/goals/GoalCollectionModel.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { ErrorHandler } from '$lib/utils/ErrorHandler';

export class CreateGoalModalPresenter extends ErrorHandler {
	title = $state<string>();

	constructor(
		errorService: ErrorService,
		private goalCollectionModel: GoalCollectionModel
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
				return this.goalCollectionModel.createGoal(this.title);
			}
		})
	}
}
