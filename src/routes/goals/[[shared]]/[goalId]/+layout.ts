import { error } from '@sveltejs/kit';

export const load = async ({ parent, params }) => {
	const { presenterFactory, modelFactory } = await parent();
	let shared = false;

	if (params.shared === 'shared') {
		shared = true;
	} else if (params.shared) {
		throw error(404, 'Not found');
	}

	const goalModel = shared
		? modelFactory.createSharedGoalModel(params.goalId)
		: modelFactory.createGoalModel(params.goalId);

	const goalRoutePresenter = presenterFactory.createGoalRoutePresenter(goalModel);
	return {
		loadingGoalRoute: goalRoutePresenter.load({}),
		goalRoutePresenter
	};
};
