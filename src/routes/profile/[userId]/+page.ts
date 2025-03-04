export const load = async ({ params, parent }) => {
	const { modelFactory, presenterFactory, user } = await parent();
	const { userId } = params;
	const profileModel = modelFactory.createUserProfileDataModel(userId, { initialData: user });
	const profilePagePresenter = presenterFactory.createProfilePagePresenter(profileModel, userId);

	return { profilePagePresenter, loadingProfilePage: profilePagePresenter.load({}) };
};
