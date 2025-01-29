import { ModelFactory } from "$lib/factories/models/ModelFactory.svelte";
import { PresenterFactory } from "$lib/factories/presenters/PresenterFactory.svelte";
import { SupabaseServiceFactory } from "$lib/factories/services/SupabaseServiceFactory.svelte";
import { SupabaseFactory } from "$lib/factories/supabase/SupabaseFactory.svelte";
import { VisualViewportInspector } from "$lib/presenters/window/VisualViewportInspector.svelte";

export const ssr = false;

export const load = async () => {
    const supabaseFactory = new SupabaseFactory();
    const serviceFactory = new SupabaseServiceFactory(supabaseFactory);
    const modelFactory = new ModelFactory(serviceFactory);
    const visualViewportInspector = new VisualViewportInspector(window);
    const presenterFactory = new PresenterFactory(serviceFactory, modelFactory, visualViewportInspector);
    const presenter = presenterFactory.createRootLayoutPresenter();
    await presenter.load({});
    return {
        presenterFactory,
        rootLayoutPresenter: presenter
    }
}