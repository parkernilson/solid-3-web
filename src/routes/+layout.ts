import { PresenterFactory } from "$lib/factories/presenters/PresenterFactory.svelte";
import { SupabaseServiceFactory } from "$lib/factories/services/SupabaseServiceFactory.svelte";
import { SupabaseFactory } from "$lib/factories/supabase/SupabaseFactory.svelte";
import { VisualViewportInspector } from "$lib/presenters/window/VisualViewportInspector.svelte";

export const ssr = false;

export const load = async () => {
    const supabaseFactory = new SupabaseFactory();
    const serviceFactory = new SupabaseServiceFactory(supabaseFactory);
    const visualViewportInspector = new VisualViewportInspector(window);
    const presenterFactory = new PresenterFactory(serviceFactory, visualViewportInspector);
    const presenter = presenterFactory.createRootLayoutPresenter();
    await presenter.load({});
    return {
        presenterFactory,
        rootLayoutPresenter: presenter
    }
}