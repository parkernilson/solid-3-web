import { presenterFactory } from '$lib/factories/index.js';

export const load = async ({ parent }) => {
    const { goalRoutePresenter } = await parent();
    const presenter = presenterFactory.createShareGoalPagePresenter(goalRoutePresenter);
    return {
        shareGoalPagePresenter: presenter
    }
}