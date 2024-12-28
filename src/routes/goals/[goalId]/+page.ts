import { presenterFactory } from "$lib/factories/index.js";

export const load = async ({ parent }) => {
    const { goalRoutePresenter } = await parent();
    const goalPagePresenter = presenterFactory.createGoalPagePresenter(goalRoutePresenter)
    return {
        goalPagePresenter,
    }
}