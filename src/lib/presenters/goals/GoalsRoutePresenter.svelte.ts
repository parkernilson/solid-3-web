import { GoalCollectionModel } from '$lib/model/models/goals/GoalCollectionModel.svelte';
import type { SharedGoalsModel } from '$lib/model/models/goals/SharedGoalsModel.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { LoadablePresenter } from '../LoadablePresenter.svelte';

export class GoalsRoutePresenter extends LoadablePresenter {
	constructor(
		errorService: ErrorService,
		private goalCollectionModel: GoalCollectionModel,
		private sharedGoalsModel: SharedGoalsModel,
	) {
		super(errorService);
	}

	protected async loadResource(): Promise<void> {
		await Promise.all([
			this.goalCollectionModel.load(),
			this.sharedGoalsModel.load()
		])
	}
}
