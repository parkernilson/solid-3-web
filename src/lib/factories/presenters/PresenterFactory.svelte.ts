import type { Goal, IEntry, IGoalInfo, ISharedGoalPreview } from '$lib/model/domain/goals';
import type { UserProfile } from '$lib/model/domain/users';
import type { AuthModel } from '$lib/model/models/auth/AuthModel.svelte';
import type { GoalCollectionModel } from '$lib/model/models/goals/GoalCollectionModel.svelte';
import type { GoalInfoDataModel } from '$lib/model/models/goals/GoalInfoDataModel.svelte';
import type { GoalModel } from '$lib/model/models/goals/GoalModel.svelte';
import type { SharedGoalInfoDataModel } from '$lib/model/models/goals/SharedGoalInfoDataModel.svelte';
import type { SharedGoalsModel } from '$lib/model/models/goals/SharedGoalsModel.svelte';
import type { UserProfileDataModel } from '$lib/model/models/profile/UserProfileDataModel.svelte';
import { LoginPresenter } from '$lib/presenters/auth/LoginPresenter.svelte';
import { ProfilePagePresenter } from '$lib/presenters/auth/ProfilePagePresenter.svelte';
import { ProfilePicturePresenter } from '$lib/presenters/auth/ProfilePicturePresenter.svelte';
import { DialogPresenter } from '$lib/presenters/DialogPresenter.svelte';
import { CreateGoalModalPresenter } from '$lib/presenters/goals/CreateGoalModalPresenter.svelte';
import { EntryGalleryPresenter } from '$lib/presenters/goals/EntryGalleryPresenter.svelte';
import { EntrySquarePresenter } from '$lib/presenters/goals/EntrySquarePresenter.svelte';
import { GoalListViewPresenter } from '$lib/presenters/goals/GoalListViewPresenter.svelte';
import { GoalPagePresenter } from '$lib/presenters/goals/GoalPagePresenter.svelte';
import { GoalRoutePresenter } from '$lib/presenters/goals/GoalRoutePresenter.svelte';
import { GoalsPagePresenter } from '$lib/presenters/goals/GoalsPagePresenter.svelte';
import { GoalsRoutePresenter } from '$lib/presenters/goals/GoalsRoutePresenter.svelte';
import {
	EntryModalPresenter,
	type EntryModalMode
} from '$lib/presenters/goals/EntryModalPresenter.svelte';
import { ShareGoalDialogPresenter } from '$lib/presenters/goals/ShareGoalDialogPresenter.svelte';
import { ShareGoalPagePresenter } from '$lib/presenters/goals/ShareGoalPagePresenter.svelte';
import { ShareRequestListViewPresenter } from '$lib/presenters/goals/ShareRequestListViewPresenter.svelte';
import { ShareRequestsPagePresenter } from '$lib/presenters/goals/ShareRequestsPagePresenter.svelte';
import {
	UserPickerPresenter,
	type UserSelectAction
} from '$lib/presenters/users/UserPickerPresenter.svelte';
import type { VisualViewportInspector } from '$lib/presenters/window/VisualViewportInspector.svelte';
import { ModelFactory } from '../models/ModelFactory.svelte';
import type { ServiceFactory } from '../services/ServiceFactory.svelte';

export class PresenterFactory {
	private dialogPresenterInstance: DialogPresenter;

	constructor(
		private authModel: AuthModel,
		private serviceFactory: ServiceFactory,
		private modelFactory: ModelFactory,
		private visualViewportInspector: VisualViewportInspector
	) {
		this.dialogPresenterInstance = new DialogPresenter(serviceFactory.createErrorService());
	}

	createLoginPresenter() {
		return new LoginPresenter(
			this.authModel,
			this.serviceFactory.createAuthService(),
			this.serviceFactory.createErrorService()
		);
	}

	createGoalsRoutePresenter(
		goalCollectionModel: GoalCollectionModel,
		sharedGoalsModel: SharedGoalsModel
	) {
		return new GoalsRoutePresenter(
			this.serviceFactory.createErrorService(),
			goalCollectionModel,
			sharedGoalsModel
		);
	}

	createGoalsPagePresenter(
		goalCollectionModel: GoalCollectionModel,
		sharedGoalsModel: SharedGoalsModel
	) {
		return new GoalsPagePresenter(
			this.authModel,
			this.serviceFactory.createErrorService(),
			goalCollectionModel,
			sharedGoalsModel
		);
	}

	createGoalRoutePresenter(goalModel: GoalModel) {
		return new GoalRoutePresenter(this.serviceFactory.createErrorService(), goalModel);
	}

	createGoalPagePresenter(goalRoutePresenter: GoalRoutePresenter) {
		return new GoalPagePresenter(goalRoutePresenter);
	}

	createShareGoalDialogPresenter(goal: Goal) {
		return new ShareGoalDialogPresenter(
			goal,
			this.serviceFactory.createGoalService(),
			this.serviceFactory.createErrorService(),
			this.dialogPresenterInstance
		);
	}

	createEntryGalleryPresenter(goalId: string, goalModel: GoalModel) {
		return new EntryGalleryPresenter(
			goalId,
			goalModel,
			this.serviceFactory.createGoalService(),
			this.serviceFactory.createErrorService()
		);
	}

	createShareGoalPagePresenter(goalRoutePresenter: GoalRoutePresenter) {
		return new ShareGoalPagePresenter(goalRoutePresenter);
	}

	getDialogPresenterInstance() {
		return this.dialogPresenterInstance;
	}

	createUserPickerPresenter(
		excludeSelf: boolean,
		initialSelectedUsers?: UserProfile[],
		beforeSelect?: UserSelectAction,
		onSelect?: UserSelectAction,
		beforeDeselect?: UserSelectAction,
		onDeselect?: UserSelectAction
	) {
		return new UserPickerPresenter(
			this.serviceFactory.createErrorService(),
			this.authModel,
			this.serviceFactory.createGoalService(),
			excludeSelf,
			initialSelectedUsers,
			beforeSelect,
			onSelect,
			beforeDeselect,
			onDeselect
		);
	}

	createShareRequestsPagePresenter(sharedGoalsModel: SharedGoalsModel) {
		return new ShareRequestsPagePresenter(
			this.serviceFactory.createErrorService(),
			sharedGoalsModel
		);
	}

	createShareRequestListViewPresenter(
		sharedGoalsModel: SharedGoalsModel,
		sharedGoalPreview: ISharedGoalPreview
	) {
		return new ShareRequestListViewPresenter(
			this.serviceFactory.createErrorService(),
			sharedGoalsModel,
			sharedGoalPreview
		);
	}

	createGoalListViewPresenter(
		goalInfo: IGoalInfo,
		goalInfoModel: GoalInfoDataModel | SharedGoalInfoDataModel
	) {
		return new GoalListViewPresenter(
			goalInfo,
			goalInfoModel,
			this.serviceFactory.createProfileService()
		);
	}

	createCreateGoalModalPresenter(goalCollectionModel: GoalCollectionModel) {
		return new CreateGoalModalPresenter(
			this.serviceFactory.createErrorService(),
			goalCollectionModel
		);
	}

	createProfilePagePresenter(userProfileDataModel: UserProfileDataModel, userId: string) {
		return new ProfilePagePresenter(
			this.serviceFactory.createErrorService(),
			this.serviceFactory.createAuthService(),
			this.authModel,
			userProfileDataModel,
			userId,
			this.serviceFactory.createProfileService()
		);
	}

	createProfilePicturePresenter(userId: string, imagePath?: string) {
		return new ProfilePicturePresenter(
			this.serviceFactory.createProfileService(),
			userId,
			imagePath
		);
	}

	createEntrySquarePresenter(entry: IEntry) {
		return new EntrySquarePresenter(entry);
	}

	createEntryModalPresenter(goalModel: GoalModel, mode: EntryModalMode, entryId?: string) {
		return new EntryModalPresenter(
			this.serviceFactory.createErrorService(),
			this.modelFactory,
			goalModel,
			mode,
			entryId
		);
	}
}
