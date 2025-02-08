export const load = async ({ parent }) => {
    const { sharedGoalsModel, presenterFactory } = await parent();
    const presenter = presenterFactory.createShareRequestsPagePresenter(sharedGoalsModel);
    return {
        presenter
    }
}