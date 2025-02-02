import type { SupabaseDomainConverter } from '$lib/model/converters/supabase/SupabaseDomainConverter';
import type { UserProfile } from '$lib/model/domain/users';
import { type SupabaseClient } from '$lib/supabase/supabase';
import { ErrorHandler } from '$lib/utils/ErrorHandler';
import { AuthSessionMissingError } from '@supabase/supabase-js';
import { type AuthService, type AuthStateEvent, type Subscription } from './AuthService.svelte';
import type { ErrorService } from './ErrorService.svelte';

export class SupabaseAuthService extends ErrorHandler implements AuthService {
	private supabase: SupabaseClient;

	constructor(
		supabase: SupabaseClient,
		private converter: SupabaseDomainConverter,
		errorService: ErrorService
	) {
		super(errorService);
		this.supabase = supabase;
	}

	public async getUserProfile(userId: string): Promise<UserProfile | null> {
		if (!userId) {
			return null;
		}
		const { data, error } = await this.supabase
			.from('profiles')
			.select('*')
			.eq('id', userId)
			.maybeSingle();
		if (error) {
			throw error;
		}
		if (!data) {
			throw new Error('User profile not found');
		}
		return this.converter.convertUserProfile(data);
	}

	async subscribeToAuthState(handler: (event: AuthStateEvent) => void): Promise<Subscription> {
		const { data: initialUserData, error: initialUserError } = await this.supabase.auth.getUser();
		if (initialUserError && !(initialUserError instanceof AuthSessionMissingError)) {
			throw initialUserError;
		}
		if (!initialUserError) {
			const userProfile = await this.getUserProfile(initialUserData?.user.id);
			handler({
				type: 'INITIAL_SESSION',
				user: userProfile
			});
		}

		const { data } = this.supabase.auth.onAuthStateChange(async (e, session) => {
			// NOTE: await was not working in this callback, so we need to
			// call a promise and make sure that any errors get caught.
			this.doErrorable({
				action: async () => {
					const userProfile = session?.user.id ? await this.getUserProfile(session.user.id) : null;
					if (e === 'SIGNED_IN') {
						handler({
							type: e,
							user: userProfile
						});
					} else if (e === 'SIGNED_OUT') {
						handler({
							type: 'SIGNED_OUT',
							user: null
						});
					}
				}
			});
		});

		return { unsubscribe: data.subscription.unsubscribe };
	}

	async login(email: string, password: string) {
		const { error } = await this.supabase.auth.signInWithPassword({ email, password });
		if (error) {
			throw error;
		}
	}

	async register(email: string, password: string) {
		const { error } = await this.supabase.auth.signUp({ email, password });
		if (error) {
			throw error;
		}
	}

	async logout() {
		const { error } = await this.supabase.auth.signOut();
		if (error) throw error;
	}
}
