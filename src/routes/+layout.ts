import { RootLayoutPresenter } from "$lib/presenters/root/RootLayoutPresenter.svelte";

export const ssr = false;

export const load = async () => {
    const presenter = RootLayoutPresenter.make();
    await presenter.load()
}