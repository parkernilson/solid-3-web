import { AuthModel } from '$lib/model/models/AuthModel.svelte';
import { GoalCollectionModel } from '$lib/model/models/GoalCollectionModel.svelte';
import { GoalModel } from '$lib/model/models/GoalModel.svelte';
import type { ServiceFactory } from '../services/ServiceFactory.svelte';

export class ModelFactory {
	constructor(private serviceFactory: ServiceFactory) {}

	createAuthModel(): AuthModel {
		return new AuthModel(this.serviceFactory.createAuthService());
	}

	createGoalModel(goalId: string) {
		return new GoalModel(this.serviceFactory.createGoalService(), goalId);
	}

	createGoalCollectionModel(userId: string) {
		return new GoalCollectionModel(this.serviceFactory.createGoalService(), userId);
	}
}
