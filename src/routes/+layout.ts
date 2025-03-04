import { DataStructureFactory } from '$lib/factories/data-structures/DataStructureFactory.svelte';
import { CreateDeleteRunnerFactory } from '$lib/factories/models/CreateDeleteRunnerFactory.svelte';
import { ModelFactory } from '$lib/factories/models/ModelFactory.svelte';
import { UpdateRunnerFactory } from '$lib/factories/models/UpdateRunnerFactory.svelte';
import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
import { SupabaseServiceFactory } from '$lib/factories/services/SupabaseServiceFactory.svelte';
import { SupabaseFactory } from '$lib/factories/supabase/SupabaseFactory.svelte';
import type { AuthModel } from '$lib/model/models/auth/AuthModel.svelte';
import { VisualViewportInspector } from '$lib/presenters/window/VisualViewportInspector.svelte';

export const ssr = false;

const supabaseFactory = new SupabaseFactory();
const dataStructureFactory = new DataStructureFactory();
const updateRunnerFactory = new UpdateRunnerFactory();
const createDeleteRunnerFactory = new CreateDeleteRunnerFactory();
const supabase = supabaseFactory.createSupabaseClient();
const serviceFactory = new SupabaseServiceFactory(supabase);
const modelFactory = new ModelFactory(
	serviceFactory,
	dataStructureFactory,
	updateRunnerFactory,
	createDeleteRunnerFactory,
	supabase
);
const visualViewportInspector = new VisualViewportInspector();
const authModel: AuthModel = modelFactory.createAuthModel();
const presenterFactory = new PresenterFactory(
	authModel,
	serviceFactory,
	modelFactory,
	visualViewportInspector
);

export const load = async () => {
	await authModel.setupAuthStateListener();
	visualViewportInspector.setupListener(window);
	return { presenterFactory, modelFactory, authModel };
};
