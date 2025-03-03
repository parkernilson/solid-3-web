export const load = async ({ parent }) => {
    const { goalRoutePresenter } = await parent();
    return { goalRoutePresenter };
}