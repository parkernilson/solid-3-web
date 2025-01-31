import type { ModelFactory } from '$lib/factories/models/ModelFactory.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import type { ISharedGoal } from '../../domain/goals';
import type { UserProfile } from '../../domain/users';
import type { DataModel } from '../base/DataModel.svelte';
import { ListCollectionModel } from '../base/ListCollectionModel.svelte';

export class SharedGoalCollectionModel extends ListCollectionModel<ISharedGoal> {
	constructor(
		private goalService: GoalService,
		private modelFactory: ModelFactory,
		private user: UserProfile
	) {
		super();
	}

	async load(): Promise<void> {
		const sharedGoals = await this.goalService.listSharedGoalsWithUser(this.user);
		this.setItems(sharedGoals);
	}

	protected makeConstituentDataModel(data: ISharedGoal): DataModel<ISharedGoal> {
        return this.modelFactory.createSharedGoalDataModel(data);
    }

	protected sendCreate(): Promise<ISharedGoal> {
		throw new Error('Cannot create shared goals');
	}
	protected sendDelete(): Promise<void> {
		throw new Error('Cannot delete shared goals');
	}
}
