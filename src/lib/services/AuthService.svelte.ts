import type { Session, User } from "@supabase/supabase-js";

interface SignInResponse {
    user: User;
    session: Session;
}

export abstract class AuthService {
	private _user = $state<User>();

	public get user() {
		return this._user;
	}

	protected set user(u) {
		this._user = u;
	}

	abstract setupAuthStateListener(): Promise<void>;
    abstract login(email: string, password: string): Promise<SignInResponse>;
    abstract logout(): Promise<void>;
}