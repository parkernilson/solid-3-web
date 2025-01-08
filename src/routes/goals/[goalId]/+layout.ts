export const load = async ({ parent, params }) => {
    const { presenterFactory } = await parent();
    const goalRoutePresenter = presenterFactory.createGoalRoutePresenter()
    return {
        loadingGoalRoute: goalRoutePresenter.load({ goalId: params.goalId }),
        goalRoutePresenter,
    }

}