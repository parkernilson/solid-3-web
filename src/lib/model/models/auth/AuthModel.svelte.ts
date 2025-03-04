import { UserProfile } from '$lib/model/domain/users';
import type { AuthService, Subscription } from '$lib/services/AuthService.svelte';
import type { SupabaseClient } from '$lib/supabase/supabase';

export class AuthModel {
	private _user = $state<UserProfile>();
	get user() {
		return this._user;
	}
	private set user(u) {
		this._user = u;
	}
	private authStateSubscription: Subscription = { unsubscribe: () => {} };

	constructor(
		private authService: AuthService,
		private supabase: SupabaseClient
	) {}

	async setupAuthStateListener(): Promise<{
		initialUser: UserProfile | null;
		subscription: Subscription;
	}> {
		this.authStateSubscription.unsubscribe();
		return new Promise((res, rej) => {
			let initialUserResolved = false;
			this.authStateSubscription = this.supabase.auth.onAuthStateChange((e, session) => {
				console.log('auth state change', e, session);
				if (e === 'INITIAL_SESSION' || e === 'SIGNED_IN') {
					if (session?.user) {
						this.authService
							.getUserProfile(session.user.id)
							.then((p) => {
								if (p) this.user = p;
								if (!initialUserResolved)
									res({ initialUser: p, subscription: this.authStateSubscription });
								initialUserResolved = true;
							})
							.catch((e) => {
								if (!initialUserResolved) rej(e);
								initialUserResolved = true;
							});
					} else {
						this.user = undefined;
						res({ initialUser: null, subscription: this.authStateSubscription });
						initialUserResolved = true;
					}
				} else if (e === 'SIGNED_OUT') {
					this.user = undefined;
				}
			}).data.subscription;
		});
	}

	cleanup() {
		this.authStateSubscription.unsubscribe();
	}
}
