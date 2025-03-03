export const load = async ({ params, parent }) => {
	const { goalModel, presenterFactory } = await parent();
	const entryId = params.entryId;
	const entryModalPresenter = presenterFactory.createEntryModalPresenter(
		goalModel,
		'view',
		entryId
	);
	const entryModalLoading = entryModalPresenter.load({});
	return { entryId, entryModalPresenter, entryModalLoading };
};
