import { SupabaseDomainConverter } from '$lib/model/converters/supabase/SupabaseDomainConverter';
import { ConsoleLoggingErrorService } from '$lib/services/ConsoleLoggingErrorService.svelte';
import type { ProfileService } from '$lib/services/ProfileService.svelte';
import { SupabaseAuthService } from '$lib/services/SupabaseAuthService.svelte';
import { SupabaseGoalService } from '$lib/services/SupabaseGoalService.svelte';
import { SupabaseProfileService } from '$lib/services/SupabaseProfileService.svelte';
import type { SupabaseClient } from '$lib/supabase/supabase';
import { ServiceFactory } from './ServiceFactory.svelte';

export class SupabaseServiceFactory extends ServiceFactory {
	constructor(private supabase: SupabaseClient) {
		super();
	}

	createGoalService(): SupabaseGoalService {
		return new SupabaseGoalService(
			this.supabase,
			new SupabaseDomainConverter(),
			this.createAuthService()
		);
	}

	createAuthService(): SupabaseAuthService {
		return new SupabaseAuthService(this.supabase, new SupabaseDomainConverter());
	}

	createErrorService(): ConsoleLoggingErrorService {
		return new ConsoleLoggingErrorService();
	}

	createProfileService(): ProfileService {
		return new SupabaseProfileService(this.supabase, new SupabaseDomainConverter());
	}
}
