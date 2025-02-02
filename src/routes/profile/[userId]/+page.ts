export const load = async ({ params, parent }) => {
	const { modelFactory, presenterFactory, rootLayoutPresenter } = await parent();
	const { userId } = params;
	const profileModel = modelFactory.createUserProfileDataModel(userId, rootLayoutPresenter.user);
    const profilePagePresenter = presenterFactory.createProfilePagePresenter(profileModel);

	return {
		user: rootLayoutPresenter.user,
        profilePagePresenter,
        loadingProfilePage: profilePagePresenter.load({})
	};
};
