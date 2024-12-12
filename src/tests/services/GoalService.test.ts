import { SupabaseServiceFactory } from '$lib/factories/services/SupabaseServiceFactory.svelte';
import { SupabaseFactory } from '$lib/factories/supabase/SupabaseFactory.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import type { SupabaseClient } from '$lib/supabase/supabase';
import { beforeAll, describe, it } from 'vitest';

describe('GoalService', async () => {
	let goalService: GoalService;
	let supabase: SupabaseClient;

	beforeAll(async () => {
		const supabaseFactory = new SupabaseFactory();
		const serviceFactory = new SupabaseServiceFactory(supabaseFactory);
		supabase = supabaseFactory.createSupabaseClient();
		goalService = serviceFactory.createGoalService();
	});

	// This test is left as an example for how to set up tests in the future
	it.skip('Example: should get a list of paginated entries', async () => {
		await supabase.auth.signInWithPassword({
			email: 'danexample@gmail.com',
			password: '***'
		});
		const result = await goalService.getEntriesPaginated('e962f5f7-5e82-47c6-a5a2-9b9b00e3bdbe', {
			pageSize: 10,
			exclusiveStartKey: '2024-11-25'
		});
		console.log(result);
	});
});
