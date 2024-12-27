import type { UserProfile } from "$lib/model/domain/users";

export interface AuthStateEvent {
	type: "SIGNED_IN" | "SIGNED_OUT" | "INITIAL_SESSION"
	user: UserProfile | null
}

export interface Subscription {
	unsubscribe: () => void
}

export abstract class AuthService {
	private _user = $state<UserProfile>();

	public get user() {
		return this._user;
	}

	protected set user(u: UserProfile | undefined) {
		this._user = u;
	}

	abstract subscribeToAuthState(handler: (event: AuthStateEvent) => void): Promise<Subscription>;
    abstract login(email: string, password: string): Promise<void>;
    abstract logout(): Promise<void>;
}