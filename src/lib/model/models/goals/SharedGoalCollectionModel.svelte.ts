import type { ModelFactory } from '$lib/factories/models/ModelFactory.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import type { ISharedGoalInfo } from '../../domain/goals';
import type { UserProfile } from '../../domain/users';
import type { UnsortedListDataStructure } from '../base/data-structures/UnsortedListDataStructure.svelte';
import type { DataModelInit } from '../base/DataModel.svelte';
import { ListCollectionModel } from '../base/ListCollectionModel.svelte';
import type { SharedGoalInfoDataModel } from './SharedGoalInfoDataModel.svelte';

export class SharedGoalCollectionModel extends ListCollectionModel<
	ISharedGoalInfo,
	never,
	SharedGoalInfoDataModel
> {
	constructor(
		private goalService: GoalService,
		private modelFactory: ModelFactory,
		dataStructure: UnsortedListDataStructure<SharedGoalInfoDataModel>,
		private user: UserProfile
	) {
		super(dataStructure, (g) => g.id);
	}

	protected loadData(): Promise<ISharedGoalInfo[]> {
		return this.goalService.listSharedGoalInfosWithUser(this.user);
	}

	async reload(): Promise<void> {
		await this.sendLoad();
	}

	protected makeConstituentDataModel(data: ISharedGoalInfo, init: DataModelInit<ISharedGoalInfo>): SharedGoalInfoDataModel {
		return this.modelFactory.createSharedGoalInfoDataModel(data.id, init);
	}

	protected sendCreate(): Promise<ISharedGoalInfo> {
		throw new Error('Cannot create shared goals');
	}
	protected sendDelete(): Promise<void> {
		throw new Error('Cannot delete shared goals');
	}
}
