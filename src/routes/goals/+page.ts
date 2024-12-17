import { presenterFactory } from "$lib/factories"

export const load = async ({ parent }) => {
    await parent();
    const presenter = presenterFactory.createGoalsPagePresenter()
    return {
        loadingGoalsPage: presenter.load({}),
        goalsPagePresenter: presenter
    }
}