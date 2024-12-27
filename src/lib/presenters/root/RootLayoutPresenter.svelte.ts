import type { AuthModel } from '$lib/model/models/AuthModel.svelte';
import type { AuthService } from '$lib/services/AuthService.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { LoadablePresenter } from '../LoadablePresenter.svelte';

export class RootLayoutPresenter extends LoadablePresenter {
	get user() {
		return this.authModel.user;
	}

	constructor(
		private authModel: AuthModel,
		private authService: AuthService,
		errorService: ErrorService
	) {
		super(errorService);
	}

	async loadResource(): Promise<void> {
		await this.authModel.setupAuthStateListener();
	}

	async logout() {
		await this.doErrorable({
			action: this.authService.logout.bind(this.authService)
		});
	}
}
