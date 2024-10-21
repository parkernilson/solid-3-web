import { AuthService } from '$lib/services/AuthService.svelte';
import { ErrorService } from '$lib/services/ErrorService.svelte';

export class LoginPresenter {
	private authService: AuthService;
	private errorService: ErrorService;

	private _email = $state('');
	private _password = $state('');

    public get user() {
        return this.authService.user
    }

	public get email() {
		return this._email;
	}
	public set email(e) {
		this._email = e;
	}
	public get password() {
		return this._password;
	}
	public set password(p) {
		this._password = p;
	}

	constructor(authService: AuthService, errorService: ErrorService) {
		this.authService = authService;
		this.errorService = errorService;
	}

	static make(): LoginPresenter {
		return new LoginPresenter(AuthService.instance(), ErrorService.instance());
	}

	async login() {
		try {
			const { error } = await this.authService.login(this.email, this.password);
			if (error) throw error;
		} catch (e) {
			this.errorService.reportError(e);
		}
	}
}
