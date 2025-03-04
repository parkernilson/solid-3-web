import type { UserProfile } from '$lib/model/domain/users';

export interface Subscription {
	unsubscribe: () => void;
}

export interface AuthStateEvent {
	type: 'SIGNED_IN' | 'SIGNED_OUT' | 'INITIAL_SESSION';
	user: UserProfile | null;
}

export interface AuthService {
	// TODO: move profile related methods to the profile service
	getUserProfile(userId: string): Promise<UserProfile | null>;
	// TODO: remove me
	// subscribeToAuthState(
	// 	handler: (event: AuthStateEvent) => void
	// ): Promise<{ initialUser: UserProfile | null; subscription: Subscription }>;
	login(email: string, password: string): Promise<void>;
	register(email: string, password: string): Promise<void>;
	logout(): Promise<void>;
}
