export const load = async ({ parent }) => {
    const { presenterFactory, goalCollectionModel } = await parent();
    const createGoalModalPresenter = presenterFactory.createCreateGoalModalPresenter(goalCollectionModel);
    return { createGoalModalPresenter };
}