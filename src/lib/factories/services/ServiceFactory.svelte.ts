import type { AuthService } from '$lib/services/AuthService.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { SupabaseGoalService } from '$lib/services/SupabaseGoalService.svelte';

export abstract class ServiceFactory {
	private authServiceInstance: AuthService;

	constructor() {
		this.authServiceInstance = this.createAuthService();
	}

	abstract createGoalService(): SupabaseGoalService;
	abstract createErrorService(): ErrorService;
	protected abstract createAuthService(): AuthService;

	public getAuthServiceInstance(): AuthService {
		return this.authServiceInstance;
	}
}
