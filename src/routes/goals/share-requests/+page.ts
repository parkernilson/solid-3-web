export const load = async ({ parent }) => {
    const { goalsRoutePresenter, presenterFactory } = await parent();
    const presenter = presenterFactory.createShareRequestsPagePresenter(goalsRoutePresenter);
    return {
        presenter
    }
}