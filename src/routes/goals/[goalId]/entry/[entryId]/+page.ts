export const load = async ({ params, parent }) => {
	const { goalModel, presenterFactory, goalIsShared } = await parent();
	const entryId = params.entryId;
	const isOwner = !goalIsShared;
	const entryModalPresenter = presenterFactory.createEntryModalPresenter(
		goalModel,
		'view',
		entryId,
		isOwner
	);
	const entryModalLoading = entryModalPresenter.load({});
	return { entryId, entryModalPresenter, entryModalLoading };
};
