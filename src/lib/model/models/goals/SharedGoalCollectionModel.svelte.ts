import type { ModelFactory } from '$lib/factories/models/ModelFactory.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import type { ISharedGoalInfo } from '../../domain/goals';
import type { UserProfile } from '../../domain/users';
import type { DataModel } from '../base/DataModel.svelte';
import { ListCollectionModel } from '../base/ListCollectionModel.svelte';

export class SharedGoalCollectionModel extends ListCollectionModel<ISharedGoalInfo> {
	constructor(
		private goalService: GoalService,
		private modelFactory: ModelFactory,
		private user: UserProfile
	) {
		super();
	}

	async load(): Promise<void> {
		const sharedGoals = await this.goalService.listSharedGoalInfosWithUser(this.user);
		this.setItems(sharedGoals);
	}

	async reload(): Promise<void> {
		await this.load();
	}

	protected makeConstituentDataModel(data: ISharedGoalInfo): DataModel<ISharedGoalInfo> {
        return this.modelFactory.createSharedGoalDataModel(data.id, data);
    }

	protected sendCreate(): Promise<ISharedGoalInfo> {
		throw new Error('Cannot create shared goals');
	}
	protected sendDelete(): Promise<void> {
		throw new Error('Cannot delete shared goals');
	}
}
