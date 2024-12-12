import type { AuthService } from "$lib/services/AuthService.svelte";
import type { ErrorService } from "$lib/services/ErrorService.svelte";

export class LoginPresenter {
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

	constructor(private authService: AuthService, private errorService: ErrorService) {}

	async login() {
		try {
			await this.authService.login(this.email, this.password);
		} catch (e) {
			this.errorService.reportError(e);
		}
	}
}
