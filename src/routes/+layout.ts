import { presenterFactory } from "$lib/factories";

export const ssr = false;

export const load = async () => {
    const presenter = presenterFactory.createRootLayoutPresenter();
    await presenter.load({});
    return {
        rootLayoutPresenter: presenter
    }
}