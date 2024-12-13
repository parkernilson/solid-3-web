import type { AuthService } from "$lib/services/AuthService.svelte";
import type { ErrorService } from "$lib/services/ErrorService.svelte";

export class RootLayoutPresenter {
	get user() {
		return this.authService.user;
	}

	constructor(private authService: AuthService, private errorService: ErrorService) {}

	async load() {
		try {
			await this.authService.setupAuthStateListener();
		} catch (e) {
			this.errorService.handleError(e);
		}
	}

	async logout() {
		try {
			await this.authService.logout();
		} catch (e) {
			this.errorService.handleError(e);
		}
	}
}
