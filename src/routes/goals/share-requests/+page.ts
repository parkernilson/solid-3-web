import { presenterFactory } from '$lib/factories/index.js';

export const load = async ({ parent }) => {
    const { goalsRoutePresenter } = await parent();
    const presenter = presenterFactory.createShareRequestsPagePresenter(goalsRoutePresenter);
    return {
        presenter
    }
}