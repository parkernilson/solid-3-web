import { presenterFactory } from '$lib/factories/index.js';

export const load = async ({ parent }) => {
    await parent();
    const presenter = presenterFactory.createShareRequestsPagePresenter();
    return {
        presenter
    }
}