import { presenterFactory } from "$lib/factories"

export const load = () => {
    const loginPresenter = presenterFactory.createLoginPresenter()
    return {
        loginPresenter
    }
}