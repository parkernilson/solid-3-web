import { presenterFactory } from '$lib/factories'

export const load = async ({ parent }) => {
    const { rootLayoutPresenter } = await parent()
    const goalsRoutePresenter = presenterFactory.createGoalsRoutePresenter();
    return {
        loadingGoalsRoute: goalsRoutePresenter.load({}),
        goalsRoutePresenter,
        rootLayoutPresenter
    }
}