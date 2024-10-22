import { AuthService } from '$lib/services/AuthService.svelte';
import { ErrorService } from '$lib/services/ErrorService.svelte';

export class RootLayoutPresenter {
	private authService: AuthService;
	private errorService: ErrorService;

	get user() {
		return this.authService.user;
	}

	constructor(authService: AuthService, errorService: ErrorService) {
		this.authService = authService;
		this.errorService = errorService;
	}

	static make() {
		return new RootLayoutPresenter(AuthService.instance(), ErrorService.instance());
	}

	async load() {
		try {
			await this.authService.setupAuthStateListener();
		} catch (e) {
			this.errorService.reportError(e);
		}
	}
}
