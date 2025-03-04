import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { authModel, presenterFactory, modelFactory } = await parent();
	if (!authModel.user) {
		throw redirect(302, '/login');
	}
	const goalCollectionModel = modelFactory.createGoalCollectionModel(authModel.user.id);
	const sharedGoalsModel = modelFactory.createSharedGoalsModel(authModel.user);
	const goalsRoutePresenter = presenterFactory.createGoalsRoutePresenter(
		goalCollectionModel,
		sharedGoalsModel
	);
	return {
		loadingGoalsRoute: goalsRoutePresenter.load({}),
		sharedGoalsModel,
		goalCollectionModel,
		goalsRoutePresenter,
		user: authModel.user
	};
};
