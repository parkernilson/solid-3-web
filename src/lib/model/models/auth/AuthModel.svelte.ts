import type { AuthService, Subscription } from '$lib/services/AuthService.svelte';
import { UserProfile } from '$lib/model/domain/users';

export class AuthModel {
	private _user = $state<UserProfile>();
	get user() {
		return this._user;
	}
	private set user(u) {
		this._user = u;
	}
	private authStateSubscription: Subscription = { unsubscribe: () => {} };

	constructor(private authService: AuthService) {}

	async setupAuthStateListener(): Promise<void> {
		this.authStateSubscription = await this.authService.subscribeToAuthState((event) => {
			if (event.type === 'INITIAL_SESSION' || event.type === 'SIGNED_IN') {
				this.user = event.user ?? undefined;
			} else if (event.type === 'SIGNED_OUT') {
                this.user = undefined;
            }
		});
	}

	cleanup() {
		this.authStateSubscription.unsubscribe();
	}
}
