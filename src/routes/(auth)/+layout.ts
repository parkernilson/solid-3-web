export const load = async ({ parent }) => {
    const { presenterFactory } = await parent()
    const loginPresenter = presenterFactory.createLoginPresenter()
    return {
        loginPresenter
    }
}