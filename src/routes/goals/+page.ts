import { presenterFactory } from "$lib/factories"

export const load = async ({ parent }) => {
    const { goalsRoutePresenter } = await parent();
    const goalsPagePresenter = presenterFactory.createGoalsPagePresenter(goalsRoutePresenter)
    return {
        loadingGoalsRoute: goalsRoutePresenter.load({}),
        goalsPagePresenter
    }
}