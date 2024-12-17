import { presenterFactory } from "$lib/factories/index.js";

export const load = async ({ parent }) => {
    await parent();
    const goalPagePresenter = presenterFactory.createGoalPagePresenter()
    return {
        goalPagePresenter,
    }
}