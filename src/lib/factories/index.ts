import { PresenterFactory } from "./presenters/PresenterFactory.svelte";
import { SupabaseServiceFactory } from "./services/SupabaseServiceFactory.svelte";
import { SupabaseFactory } from "./supabase/SupabaseFactory.svelte";

const supabaseFactory = new SupabaseFactory();
const serviceFactory = new SupabaseServiceFactory(supabaseFactory);
export const presenterFactory = new PresenterFactory(serviceFactory);