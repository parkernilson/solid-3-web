import type { AuthService } from "$lib/services/AuthService.svelte";
import type { ErrorService } from "$lib/services/ErrorService.svelte";
import { LoadablePresenter } from "../LoadablePresenter.svelte";

export class RootLayoutPresenter extends LoadablePresenter {
	get user() {
		return this.authService.user;
	}

	constructor(private authService: AuthService, errorService: ErrorService) {
		super(errorService);
	}

	async loadResource(): Promise<void> {
		await this.authService.setupAuthStateListener();
	}

	async logout() {
		await this.doErrorable({
			action: this.authService.logout.bind(this.authService),
		})
	}
}
