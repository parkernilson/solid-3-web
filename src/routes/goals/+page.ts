export const load = async ({ parent }) => {
    const { goalsRoutePresenter, presenterFactory } = await parent();
    const goalsPagePresenter = presenterFactory.createGoalsPagePresenter(goalsRoutePresenter)
    return {
        loadingGoalsRoute: goalsRoutePresenter.load({}),
        goalsPagePresenter
    }
}