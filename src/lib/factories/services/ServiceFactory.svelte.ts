import type { AuthService } from '$lib/services/AuthService.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { SupabaseGoalService } from '$lib/services/SupabaseGoalService.svelte';

export abstract class ServiceFactory {
	abstract createGoalService(): SupabaseGoalService;
	abstract createErrorService(): ErrorService;
	protected abstract createAuthService(): AuthService;

	abstract getAuthServiceInstance(): AuthService;
}
