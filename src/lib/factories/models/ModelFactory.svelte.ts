import type {
	IEntry,
	IGoalInfo,
	ISharedGoalInfo,
	ISharedGoalPreview
} from '$lib/model/domain/goals';
import type { UserProfile } from '$lib/model/domain/users';
import { AuthModel } from '$lib/model/models/auth/AuthModel.svelte';
import { EntryCollectionModel } from '$lib/model/models/goals/EntryCollectionModel.svelte';
import { GoalCollectionModel } from '$lib/model/models/goals/GoalCollectionModel.svelte';
import { GoalDataModel } from '$lib/model/models/goals/GoalDataModel.svelte';
import { SharedGoalCollectionModel } from '$lib/model/models/goals/SharedGoalCollectionModel.svelte';
import { SharedGoalDataModel } from '$lib/model/models/goals/SharedGoalDataModel.svelte';
import { SharedGoalPreviewCollectionModel } from '$lib/model/models/goals/SharedGoalPreviewCollectionModel.svelte';
import { SharedGoalPreviewDataModel } from '$lib/model/models/goals/SharedGoalPreviewDataModel.svelte';
import { SharedGoalsModel } from '$lib/model/models/goals/SharedGoalsModel.svelte';
import { UserProfileDataModel } from '$lib/model/models/profile/UserProfileDataModel.svelte';
import type { DataStructureFactory } from '../data-structures/DataStructureFactory.svelte';
import type { ServiceFactory } from '../services/ServiceFactory.svelte';

export class ModelFactory {
	constructor(
		private serviceFactory: ServiceFactory,
		private dataStructureFactory: DataStructureFactory
	) {}

	createAuthModel(): AuthModel {
		return new AuthModel(this.serviceFactory.createAuthService());
	}

	createGoalCollectionModel(userId: string) {
		return new GoalCollectionModel(
			this.serviceFactory.createGoalService(), 
			this, 
			this.dataStructureFactory.createGoalCollectionModelDataStructure(),
			userId
		);
	}

	createGoalModel(goalId: string, initialData?: IGoalInfo) {
		return new GoalDataModel(this.serviceFactory.createGoalService(), goalId, initialData);
	}

	createSharedGoalCollectionModel(user: UserProfile) {
		return new SharedGoalCollectionModel(
			this.serviceFactory.createGoalService(), 
			this, 
			this.dataStructureFactory.createSharedGoalCollectionModelDataStructure(),
			user
		);
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
		return new SharedGoalPreviewDataModel(initialData.id, initialData);
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

	createEntryCollectionModel(goalId: string, initialData?: IEntry[]) {
		return new EntryCollectionModel(
			this.serviceFactory.createGoalService(),
			this.dataStructureFactory.createEntryCollectionModelDataStructure(),
			goalId,
			initialData
		);
	}
}
