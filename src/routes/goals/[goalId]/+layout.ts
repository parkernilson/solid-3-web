import { presenterFactory } from "$lib/factories/index.js";

export const load = async ({ parent, params }) => {
    await parent();
    const goalRoutePresenter = presenterFactory.getNewGoalRoutePresenterInstance()
    return {
        loadingGoalRoute: goalRoutePresenter.load({ goalId: params.goalId }),
        goalRoutePresenter,
    }

}