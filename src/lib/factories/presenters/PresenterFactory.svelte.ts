import type { Entry, Goal, UserProfile } from '$lib/model/domain/goals';
import { LoginPresenter } from '$lib/presenters/auth/LoginPresenter.svelte';
import { DialogPresenter } from '$lib/presenters/DialogPresenter.svelte';
import { EntryGalleryPresenter } from '$lib/presenters/goals/EntryGalleryPresenter.svelte';
import { EntryModalPresenter } from '$lib/presenters/goals/EntryModalPresenter.svelte';
import { GoalPagePresenter } from '$lib/presenters/goals/GoalPagePresenter.svelte';
import { GoalRoutePresenter } from '$lib/presenters/goals/GoalRoutePresenter.svelte';
import { GoalsPagePresenter } from '$lib/presenters/goals/GoalsPagePresenter.svelte';
import { ShareGoalDialogPresenter } from '$lib/presenters/goals/ShareGoalDialogPresenter.svelte';
import { ShareGoalPagePresenter } from '$lib/presenters/goals/ShareGoalPagePresenter.svelte';
import { RootLayoutPresenter } from '$lib/presenters/root/RootLayoutPresenter.svelte';
import { UserPickerPresenter, type UserSelectAction } from '$lib/presenters/users/UserPickerPresenter.svelte';
import type { ServiceFactory } from '../services/ServiceFactory.svelte';

export class PresenterFactory {
	private goalRoutePresenterInstance: GoalRoutePresenter | undefined;
	private dialogPresenterInstance: DialogPresenter;

	constructor(private serviceFactory: ServiceFactory) {
		this.dialogPresenterInstance = new DialogPresenter(serviceFactory.createErrorService());
	}

	createRootLayoutPresenter() {
		return new RootLayoutPresenter(
			this.serviceFactory.getAuthServiceInstance(),
			this.serviceFactory.createErrorService()
		);
	}

	createLoginPresenter() {
		return new LoginPresenter(
			this.serviceFactory.getAuthServiceInstance(),
			this.serviceFactory.createErrorService()
		);
	}

	createGoalsPagePresenter() {
		return new GoalsPagePresenter(
			this.serviceFactory.getAuthServiceInstance(),
			this.serviceFactory.createErrorService(),
			this.serviceFactory.createGoalService()
		);
	}

	private createNewGoalRoutePresenter() {
		return new GoalRoutePresenter(
			this.serviceFactory.createGoalService(),
			this.serviceFactory.createErrorService()
		);
	}

    createShareGoalDialogPresenter(goal: Goal) {
        return new ShareGoalDialogPresenter(
            goal,
            this.serviceFactory.createGoalService(),
            this.serviceFactory.createErrorService()
        )
    }

	getNewGoalRoutePresenterInstance() {
		this.goalRoutePresenterInstance = this.createNewGoalRoutePresenter();
		return this.goalRoutePresenterInstance;
	}

	createGoalPagePresenter() {
		if (!this.goalRoutePresenterInstance) {
			throw new Error('Tried to create a GoalPagePresenter without a GoalRoutePresenter instance');
		}
		return new GoalPagePresenter(this.goalRoutePresenterInstance);
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
			this.serviceFactory.getAuthServiceInstance(),
			entryGalleryPresenter
		);
	}

	createShareGoalPagePresenter() {
		if (!this.goalRoutePresenterInstance) {
			throw new Error('Tried to create a ShareGoalPagePresenter without a GoalRoutePresenter instance');
		}
		return new ShareGoalPagePresenter(this.goalRoutePresenterInstance);
	}

	getDialogPresenterInstance() {
		return this.dialogPresenterInstance;
	}

	createUserPickerPresenter(
		initialSelectedUsers?: UserProfile[],
		beforeSelect?: UserSelectAction,
		onSelect?: UserSelectAction,
		beforeDeselect?: UserSelectAction,
		onDeselect?: UserSelectAction
	) {
		return new UserPickerPresenter(
			this.serviceFactory.createErrorService(),
			this.serviceFactory.createGoalService(),
			initialSelectedUsers,
			beforeSelect,
			onSelect,
			beforeDeselect,
			onDeselect
		)
	}
}
