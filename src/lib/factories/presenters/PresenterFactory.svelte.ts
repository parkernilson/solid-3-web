import type { Entry, Goal } from "$lib/model/domain/goals";
import { LoginPresenter } from "$lib/presenters/auth/LoginPresenter.svelte";
import { EntryGalleryPresenter } from "$lib/presenters/goals/EntryGalleryPresenter.svelte";
import { EntryModalPresenter } from "$lib/presenters/goals/EntryModalPresenter.svelte";
import { GoalPagePresenter } from "$lib/presenters/goals/GoalPagePresenter.svelte";
import { GoalsPagePresenter } from "$lib/presenters/goals/GoalsPagePresenter.svelte";
import { RootLayoutPresenter } from "$lib/presenters/root/RootLayoutPresenter.svelte";
import type { ServiceFactory } from "../services/ServiceFactory.svelte";

export class PresenterFactory {
    constructor(private serviceFactory: ServiceFactory) {}

    createRootLayoutPresenter() {
        return new RootLayoutPresenter(
            this.serviceFactory.getAuthServiceInstance(),
            this.serviceFactory.createErrorService()
        )
    }

    createLoginPresenter() {
        return new LoginPresenter(
            this.serviceFactory.getAuthServiceInstance(),
            this.serviceFactory.createErrorService()
        )
    }

    createGoalsPagePresenter() {
        return new GoalsPagePresenter(
            this.serviceFactory.getAuthServiceInstance(),
            this.serviceFactory.createErrorService(),
            this.serviceFactory.createGoalService()
        )
    }

    createGoalPagePresenter() {
        return new GoalPagePresenter(
            this.serviceFactory.createGoalService(),
            this.serviceFactory.createErrorService(),
        )
    }

    createEntryGalleryPresenter(goalId: string) {
        return new EntryGalleryPresenter(
            goalId,
            this.serviceFactory.createGoalService(),
            this.serviceFactory.createErrorService()
        )
    }

    createEntryModalPresenter(entryGalleryPresenter: EntryGalleryPresenter, goal: Goal, entry?: Entry) {
        return new EntryModalPresenter(
            entry ?? null,
            goal,
            this.serviceFactory.createGoalService(),
            this.serviceFactory.createErrorService(),
            this.serviceFactory.getAuthServiceInstance(),
            entryGalleryPresenter
        )
    }
}