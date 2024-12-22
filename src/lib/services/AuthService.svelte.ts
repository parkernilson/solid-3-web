import type { UserProfile } from "$lib/model/domain/users";

export abstract class AuthService {
	private _user = $state<UserProfile>();

	public get user() {
		return this._user;
	}

	protected set user(u: UserProfile | undefined) {
		this._user = u;
	}

	abstract setupAuthStateListener(): Promise<void>;
    abstract login(email: string, password: string): Promise<void>;
    abstract logout(): Promise<void>;
}