import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { presenterFactory, authModel } = await parent();
	if (authModel.user) {
		throw redirect(302, '/goals');
	}
	const loginPresenter = presenterFactory.createLoginPresenter();
	return { loginPresenter };
};
