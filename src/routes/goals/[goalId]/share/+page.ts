export const load = async ({ parent }) => {
    const { goalRoutePresenter, presenterFactory } = await parent();
    const presenter = presenterFactory.createShareGoalPagePresenter(goalRoutePresenter);
    return {
        shareGoalPagePresenter: presenter
    }
}