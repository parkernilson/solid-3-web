import { presenterFactory } from "$lib/factories"

export const load = async ({ parent }) => {
    await parent();
    const goalsRoutePresenter = presenterFactory.getNewGoalsRoutePresenterInstance()
    const goalsPagePresenter = presenterFactory.createGoalsPagePresenter()
    return {
        loadingGoalsRoute: goalsRoutePresenter.load({}),
        goalsRoutePresenter,
        goalsPagePresenter
    }
}