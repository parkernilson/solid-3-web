export const load = async ({ parent, params, url }) => {
	const { presenterFactory, modelFactory } = await parent();
	const queryParams = url.searchParams;
	const shared = queryParams.get('shared') === 'true';

	const goalModel = shared
		? modelFactory.createSharedGoalModel(params.goalId)
		: modelFactory.createGoalModel(params.goalId);

	const goalRoutePresenter = presenterFactory.createGoalRoutePresenter(goalModel);
	return {
		loadingGoalRoute: goalRoutePresenter.load({}),
		goalModel,
		goalRoutePresenter,
		goalIsShared: shared
	};
};
