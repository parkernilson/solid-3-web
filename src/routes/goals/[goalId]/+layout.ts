export const load = async ({ parent, params }) => {
    const { presenterFactory } = await parent();
    const goalRoutePresenter = presenterFactory.createGoalRoutePresenter(params.goalId)
    return {
        loadingGoalRoute: goalRoutePresenter.load({}),
        goalRoutePresenter,
    }

}