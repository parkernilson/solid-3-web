import type {
	IEntry,
	IGoal,
	IGoalInfo,
	IGoalStats,
	ISharedGoalInfo,
	ISharedGoalPreview
} from '$lib/model/domain/goals';
import type { UserProfile } from '$lib/model/domain/users';
import { AuthModel } from '$lib/model/models/auth/AuthModel.svelte';
import type { DataModelInit } from '$lib/model/models/base/DataModel.svelte';
import { EntryCollectionModel } from '$lib/model/models/goals/EntryCollectionModel.svelte';
import { EntryDataModel } from '$lib/model/models/goals/EntryDataModel.svelte';
import { GoalCollectionModel } from '$lib/model/models/goals/GoalCollectionModel.svelte';
import { GoalDataModel } from '$lib/model/models/goals/GoalDataModel.svelte';
import { GoalInfoDataModel } from '$lib/model/models/goals/GoalInfoDataModel.svelte';
import { GoalModel } from '$lib/model/models/goals/GoalModel.svelte';
import { GoalStatsDataModel } from '$lib/model/models/goals/GoalStatsDataModel.svelte';
import { SharedGoalCollectionModel } from '$lib/model/models/goals/SharedGoalCollectionModel.svelte';
import { SharedGoalDataModel } from '$lib/model/models/goals/SharedGoalDataModel.svelte';
import { SharedGoalInfoDataModel } from '$lib/model/models/goals/SharedGoalInfoDataModel.svelte';
import { SharedGoalPreviewCollectionModel } from '$lib/model/models/goals/SharedGoalPreviewCollectionModel.svelte';
import { SharedGoalPreviewDataModel } from '$lib/model/models/goals/SharedGoalPreviewDataModel.svelte';
import { SharedGoalsModel } from '$lib/model/models/goals/SharedGoalsModel.svelte';
import { UserProfileDataModel } from '$lib/model/models/profile/UserProfileDataModel.svelte';
import type { DataStructureFactory } from '../data-structures/DataStructureFactory.svelte';
import type { ServiceFactory } from '../services/ServiceFactory.svelte';
import type { CreateDeleteRunnerFactory } from './CreateDeleteRunnerFactory.svelte';
import type { UpdateRunnerFactory } from './UpdateRunnerFactory.svelte';

export class ModelFactory {
	constructor(
		private serviceFactory: ServiceFactory,
		private dataStructureFactory: DataStructureFactory,
		private updateRunnerFactory: UpdateRunnerFactory,
		private createDeleteRunnerFactory: CreateDeleteRunnerFactory
	) {}

	createAuthModel(): AuthModel {
		return new AuthModel(this.serviceFactory.createAuthService());
	}

	createGoalCollectionModel(userId: string) {
		return new GoalCollectionModel(
			this.serviceFactory.createGoalService(),
			this,
			this.dataStructureFactory.createGoalCollectionModelDataStructure(),
			this.createDeleteRunnerFactory.createGoalCollectionCDRunnerConstructor(),
			userId
		);
	}

	createGoalDataModel(goalId: string, initialData?: IGoal) {
		return new GoalDataModel(this.serviceFactory.createGoalService(), goalId, initialData);
	}

	createGoalStatsDataModel(goalId: string, initialData?: IGoalStats) {
		return new GoalStatsDataModel(this.serviceFactory.createGoalService(), goalId, initialData);
	}

	createGoalInfoDataModel(goalId: string, initialData?: IGoalInfo) {
		return new GoalInfoDataModel(
			this.serviceFactory.createGoalService(),
			goalId,
			initialData
		)
	}

	createGoalModel(goalId: string, initialData?: IGoalInfo) {
		return new GoalModel(
			this.createGoalDataModel(goalId, initialData),
			this.createGoalStatsDataModel(goalId, initialData),
			this.createEntryCollectionModel(goalId, false)
		)
	}

	createSharedGoalModel(goalId: string, initialData?: ISharedGoalInfo) {
		return new GoalModel(
			this.createSharedGoalDataModel(goalId, initialData),
			this.createGoalStatsDataModel(goalId, initialData),
			this.createEntryCollectionModel(goalId, true)
		)
	}

	createSharedGoalCollectionModel(user: UserProfile) {
		return new SharedGoalCollectionModel(
			this.serviceFactory.createGoalService(),
			this,
			this.dataStructureFactory.createSharedGoalCollectionModelDataStructure(),
			user
		);
	}

	createSharedGoalInfoDataModel(goalId: string, initialData?: ISharedGoalInfo) {
		return new SharedGoalInfoDataModel(this.serviceFactory.createGoalService(), goalId, initialData);
	}

	createSharedGoalDataModel(goalId: string, initialData?: ISharedGoalInfo) {
		return new SharedGoalDataModel(this.serviceFactory.createGoalService(), goalId, initialData);
	}

	createSharedGoalPreviewCollectionModel(user: UserProfile) {
		return new SharedGoalPreviewCollectionModel(
			this.serviceFactory.createGoalService(),
			this,
			this.dataStructureFactory.createSharedGoalPreviewCollectionModelDataStructure(),
			user
		);
	}

	createSharedGoalPreviewDataModel(initialData: ISharedGoalPreview) {
		return new SharedGoalPreviewDataModel(initialData.id, { initialData });
	}

	createSharedGoalsModel(user: UserProfile) {
		return new SharedGoalsModel(this, user, this.serviceFactory.createGoalService());
	}

	createUserProfileDataModel(userId: string, initialData?: UserProfile) {
		return new UserProfileDataModel(
			this.serviceFactory.createAuthService(),
			this.serviceFactory.createProfileService(),
			userId,
			initialData
		);
	}

	createEntryDataModel(entryId: string, init: DataModelInit<IEntry> = {}) {
		return new EntryDataModel(
			this.serviceFactory.createGoalService(),
			this.updateRunnerFactory.getConcurrentUpdateRunnerConstructor(),
			entryId,
			init
		)
	}

	createEntryCollectionModel(goalId: string, shared: boolean, initialData?: IEntry[]) {
		return new EntryCollectionModel(
			this.serviceFactory.createGoalService(),
			this,
			this.createDeleteRunnerFactory.createEntryCollectionCDRunnerConstructor(),
			this.dataStructureFactory.createEntryCollectionModelDataStructure(),
			goalId,
			shared,
			initialData
		);
	}
}
