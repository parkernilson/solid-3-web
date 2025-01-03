import { presenterFactory } from '$lib/factories'
import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
    const { rootLayoutPresenter } = await parent()
    if (!rootLayoutPresenter.user) {
        throw redirect(302, '/login')
    }
    const goalsRoutePresenter = presenterFactory.createGoalsRoutePresenter();
    return {
        loadingGoalsRoute: goalsRoutePresenter.load({}),
        goalsRoutePresenter,
        rootLayoutPresenter
    }
}