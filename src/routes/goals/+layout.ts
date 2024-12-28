import { presenterFactory } from '$lib/factories'

export const load = async ({ parent }) => {
    await parent()
    const goalsRoutePresenter = presenterFactory.createGoalsRoutePresenter();
    return {
        loadingGoalsRoute: goalsRoutePresenter.load({}),
        goalsRoutePresenter
    }
}