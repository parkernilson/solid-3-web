import type { AuthModel } from "$lib/model/models/auth/AuthModel.svelte";
import type { AuthService } from "$lib/services/AuthService.svelte";
import type { ErrorService } from "$lib/services/ErrorService.svelte";
import { ErrorHandler } from "$lib/utils/ErrorHandler";

export class LoginPresenter extends ErrorHandler {
	private _email = $state('');
	private _password = $state('');

    public get user() {
        return this.authModel.user
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

	constructor(private authModel: AuthModel, private authService: AuthService, errorService: ErrorService) {
		super(errorService);
	}

	async login() {
		await this.doErrorable({
			action: async () => {
				await this.authService.login(this.email, this.password);
			}
		})
	}

	async register() {
		await this.doErrorable({
			action: async () => {
				await this.authService.register(this.email, this.password);
			}
		})
	}

}
