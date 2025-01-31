import type { AuthModel } from '$lib/model/models/auth/AuthModel.svelte';
import type { GoalCollectionModel } from '$lib/model/models/goals/GoalCollectionModel.svelte';
import type { SharedGoalsModel } from '$lib/model/models/goals/SharedGoalsModel.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { ErrorHandler } from '../../utils/ErrorHandler';

export class GoalsPagePresenter extends ErrorHandler {
	public get goals() {
		return this.goalsCollectionModel.data;
	}
	public get sharedGoalsWithMe() {
		return this.sharedGoalsModel.sharedGoalsWithMe;
	}
	public get sharedGoalsWithMePending() {
		return this.sharedGoalsModel.sharedGoalsWithMePending;
	}
	public get user() {
		return this.authModel.user;
	}

	constructor(
		private authModel: AuthModel,
		errorService: ErrorService,
		private goalsCollectionModel: GoalCollectionModel,
		private sharedGoalsModel: SharedGoalsModel,
	) {
		super(errorService);
	}
}
