import type { AuthService } from '$lib/services/AuthService.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';

export abstract class ServiceFactory {
	abstract createGoalService(): GoalService;
	abstract createErrorService(): ErrorService;
	abstract createAuthService(): AuthService;
}
