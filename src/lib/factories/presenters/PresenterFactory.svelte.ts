import type { Entry, Goal } from '$lib/model/domain/goals';
import type { UserProfile } from '$lib/model/domain/users';
import type { AuthModel } from '$lib/model/models/AuthModel.svelte';
import { LoginPresenter } from '$lib/presenters/auth/LoginPresenter.svelte';
import { DialogPresenter } from '$lib/presenters/DialogPresenter.svelte';
import { EntryGalleryPresenter } from '$lib/presenters/goals/EntryGalleryPresenter.svelte';
import { EntryModalPresenter } from '$lib/presenters/goals/EntryModalPresenter.svelte';
import { GoalPagePresenter } from '$lib/presenters/goals/GoalPagePresenter.svelte';
import { GoalRoutePresenter } from '$lib/presenters/goals/GoalRoutePresenter.svelte';
import { GoalsPagePresenter } from '$lib/presenters/goals/GoalsPagePresenter.svelte';
import { GoalsRoutePresenter } from '$lib/presenters/goals/GoalsRoutePresenter.svelte';
import { ShareGoalDialogPresenter } from '$lib/presenters/goals/ShareGoalDialogPresenter.svelte';
import { ShareGoalPagePresenter } from '$lib/presenters/goals/ShareGoalPagePresenter.svelte';
import { ShareRequestsPagePresenter } from '$lib/presenters/goals/ShareRequestsPagePresenter.svelte';
import { RootLayoutPresenter } from '$lib/presenters/root/RootLayoutPresenter.svelte';
import { UserPickerPresenter, type UserSelectAction } from '$lib/presenters/users/UserPickerPresenter.svelte';
import { ModelFactory } from '../models/ModelFactory.svelte';
import type { ServiceFactory } from '../services/ServiceFactory.svelte';

export class PresenterFactory {
	private dialogPresenterInstance: DialogPresenter;
	private modelFactory: ModelFactory;
	private _authModelInstance: AuthModel;

	private get authModelInstance() {
		return this._authModelInstance;
	}

	constructor(private serviceFactory: ServiceFactory) {
		this.dialogPresenterInstance = new DialogPresenter(serviceFactory.createErrorService());
		this.modelFactory = new ModelFactory(serviceFactory.createAuthService())
		this._authModelInstance = this.modelFactory.createAuthModel();
	}

	createRootLayoutPresenter() {
		return new RootLayoutPresenter(
			this.authModelInstance,
			this.serviceFactory.createAuthService(),
			this.serviceFactory.createErrorService()
		);
	}

	createLoginPresenter() {
		return new LoginPresenter(
			this.authModelInstance,
			this.serviceFactory.createAuthService(),
			this.serviceFactory.createErrorService()
		);
	}

	createGoalsRoutePresenter() {
		return new GoalsRoutePresenter(
			this.authModelInstance,
			this.serviceFactory.createErrorService(),
			this.serviceFactory.createGoalService()
		)
	}

	createGoalsPagePresenter(goalsRoutePresenter: GoalsRoutePresenter) {
		return new GoalsPagePresenter(
			this.serviceFactory.createAuthService(),
			this.serviceFactory.createErrorService(),
			goalsRoutePresenter
		);
	}

	createGoalRoutePresenter() {
		return new GoalRoutePresenter(
			this.serviceFactory.createGoalService(),
			this.serviceFactory.createErrorService()
		);
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
        )
    }

	createEntryGalleryPresenter(goalId: string) {
		return new EntryGalleryPresenter(
			goalId,
			this.serviceFactory.createGoalService(),
			this.serviceFactory.createErrorService()
		);
	}

	createEntryModalPresenter(
		entryGalleryPresenter: EntryGalleryPresenter,
		goal: Goal,
		entry?: Entry
	) {
		return new EntryModalPresenter(
			entry ?? null,
			goal,
			this.serviceFactory.createGoalService(),
			this.serviceFactory.createErrorService(),
			this.modelFactory.createAuthModel(),
			this.serviceFactory.createAuthService(),
			entryGalleryPresenter
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
			this.serviceFactory.createGoalService(),
			excludeSelf,
			initialSelectedUsers,
			beforeSelect,
			onSelect,
			beforeDeselect,
			onDeselect
		)
	}

	createShareRequestsPagePresenter(goalsRoutePresenter: GoalsRoutePresenter) {
		return new ShareRequestsPagePresenter(
			this.serviceFactory.createErrorService(),
			this.serviceFactory.createGoalService(),
			goalsRoutePresenter
		);
	}
}
