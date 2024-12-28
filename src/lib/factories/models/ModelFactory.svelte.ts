import { AuthModel } from '$lib/model/models/AuthModel.svelte';
import type { AuthService } from '$lib/services/AuthService.svelte';

export class ModelFactory {
	constructor(private authService: AuthService) {}

	createAuthModel(): AuthModel {
		return new AuthModel(this.authService);
	}
}
