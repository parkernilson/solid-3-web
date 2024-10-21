import { AuthService } from '$lib/services/AuthService.svelte';
import { ErrorService } from '$lib/services/ErrorService.svelte';

export class GoalsPagePresenter {
	private authService: AuthService;
	private errorService: ErrorService;

	public get user() {
		return this.authService.user;
	}

	constructor(authService: AuthService, errorService: ErrorService) {
		this.authService = authService;
		this.errorService = errorService;
	}

	static make() {
		return new GoalsPagePresenter(AuthService.instance(), ErrorService.instance());
	}

	async logout() {
		try {
			await this.authService.logout();
		} catch (e) {
			this.errorService.reportError(e);
		}
	}
}
