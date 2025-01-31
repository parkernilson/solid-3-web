export const load = async ({ parent }) => {
    const { presenterFactory, goalCollectionModel, sharedGoalsModel } = await parent();
    const goalsPagePresenter = presenterFactory.createGoalsPagePresenter(goalCollectionModel, sharedGoalsModel)
    return {
        goalsPagePresenter,
    }
}