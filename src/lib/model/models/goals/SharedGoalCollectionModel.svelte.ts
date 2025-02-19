import type { ModelFactory } from '$lib/factories/models/ModelFactory.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import type { ISharedGoalInfo } from '../../domain/goals';
import type { UserProfile } from '../../domain/users';
import { ListCollectionModel } from '../base/ListCollectionModel.svelte';
import type { ListDataStructure } from '../base/ListDataStructure.svelte';
import type { SharedGoalDataModel } from './SharedGoalDataModel.svelte';

export class SharedGoalCollectionModel extends ListCollectionModel<ISharedGoalInfo, SharedGoalDataModel> {
	constructor(
		private goalService: GoalService,
		private modelFactory: ModelFactory,
		dataStructure: ListDataStructure<SharedGoalDataModel>,
		private user: UserProfile
	) {
		super(dataStructure);
	}

	async sendLoad(): Promise<void> {
		const sharedGoals = await this.goalService.listSharedGoalInfosWithUser(this.user);
		this.setItems(sharedGoals);
	}

	async reload(): Promise<void> {
		await this.sendLoad();
	}

	protected makeConstituentDataModel(data: ISharedGoalInfo): SharedGoalDataModel {
        return this.modelFactory.createSharedGoalDataModel(data.id, data);
    }

	protected sendCreate(): Promise<ISharedGoalInfo> {
		throw new Error('Cannot create shared goals');
	}
	protected sendDelete(): Promise<void> {
		throw new Error('Cannot delete shared goals');
	}
}
