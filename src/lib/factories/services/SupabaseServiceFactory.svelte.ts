import { SupabaseDomainConverter } from '$lib/model/converters/supabase/SupabaseDomainConverter';
import { ConsoleLoggingErrorService } from '$lib/services/ConsoleLoggingErrorService.svelte';
import { SupabaseAuthService } from '$lib/services/SupabaseAuthService.svelte';
import { SupabaseGoalService } from '$lib/services/SupabaseGoalService.svelte';
import type { SupabaseClient } from '$lib/supabase/supabase';
import type { SupabaseFactory } from '../supabase/SupabaseFactory.svelte';
import { ServiceFactory } from './ServiceFactory.svelte';

export class SupabaseServiceFactory extends ServiceFactory {
	private supabase: SupabaseClient;
	private authServiceInstance: SupabaseAuthService;

	constructor(supabaseFactory: SupabaseFactory) {
		super();
		this.supabase = supabaseFactory.createSupabaseClient();
		this.authServiceInstance = this.createAuthService();
	}

	createGoalService(): SupabaseGoalService {
		return new SupabaseGoalService(this.supabase, new SupabaseDomainConverter(), this.authServiceInstance);
	}

	protected createAuthService(): SupabaseAuthService {
		return new SupabaseAuthService(this.supabase);
	}

	getAuthServiceInstance(): SupabaseAuthService {
		return this.authServiceInstance;
	}

	createErrorService(): ConsoleLoggingErrorService {
		return new ConsoleLoggingErrorService();
	}
}
