export const load = async ({ parent }) => {
    const { goalRoutePresenter, presenterFactory } = await parent();
    const goalPagePresenter = presenterFactory.createGoalPagePresenter(goalRoutePresenter)
    return {
        goalPagePresenter,
    }
}