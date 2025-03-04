import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { authModel } = await parent();
	if (authModel.user) {
		throw redirect(302, '/goals');
	} else {
		throw redirect(302, '/login');
	}
};
