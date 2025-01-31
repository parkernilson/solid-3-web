import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
    const { rootLayoutPresenter, presenterFactory, modelFactory } = await parent()
    if (!rootLayoutPresenter.user) {
        throw redirect(302, '/login')
    }
    const goalCollectionModel = modelFactory.createGoalCollectionModel(rootLayoutPresenter.user.id);
    const sharedGoalsModel = modelFactory.createSharedGoalsModel(rootLayoutPresenter.user);
    const goalsRoutePresenter = presenterFactory.createGoalsRoutePresenter(goalCollectionModel, sharedGoalsModel);
    return {
        loadingGoalsRoute: goalsRoutePresenter.load({}),
        sharedGoalsModel,
        goalCollectionModel,
        goalsRoutePresenter,
        rootLayoutPresenter
    }
}