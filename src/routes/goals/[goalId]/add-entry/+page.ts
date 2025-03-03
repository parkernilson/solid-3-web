export const load = async ({ parent }) => {
	const { goalModel, presenterFactory } = await parent();
	const entryModalPresenter = presenterFactory.createEntryModalPresenter(goalModel, 'create');
	const entryModalLoading = entryModalPresenter.load({});
	return { entryModalPresenter, entryModalLoading };
};
