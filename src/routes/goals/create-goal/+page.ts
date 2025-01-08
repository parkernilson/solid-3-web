export const load = async ({ parent }) => {
    const { goalsRoutePresenter, presenterFactory } = await parent();
    const createGoalModalPresenter = presenterFactory.createCreateGoalModalPresenter(goalsRoutePresenter);
    return { createGoalModalPresenter };
}