import type { SupabaseDomainConverter } from '$lib/model/converters/supabase/SupabaseDomainConverter';
import type { UserProfile } from '$lib/model/domain/users';
import { type SupabaseClient } from '$lib/supabase/supabase';
import { AuthSessionMissingError } from '@supabase/supabase-js';
import { type AuthService, type AuthStateEvent, type Subscription } from './AuthService.svelte';

export class SupabaseAuthService implements AuthService {
	private supabase: SupabaseClient;

	constructor(
		supabase: SupabaseClient,
		private converter: SupabaseDomainConverter
	) {
		this.supabase = supabase;
	}

	private async getUserProfile(userId: string): Promise<UserProfile> {
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
		const { data: initialUserData, error } = await this.supabase.auth.getUser();

		if (error && !(error instanceof AuthSessionMissingError)) {
			throw error;
		}

		if (initialUserData.user) {
			handler({
				type: 'INITIAL_SESSION',
				user: await this.getUserProfile(initialUserData.user.id)
			});
		}

		const { data } = this.supabase.auth.onAuthStateChange(async (e, session) => {
			if (e === 'INITIAL_SESSION' || e === 'SIGNED_IN') {
				handler({
					type: e,
					user: session ? await this.getUserProfile(session?.user.id) : null
				});
			} else if (e === 'SIGNED_OUT') {
				handler({
					type: 'SIGNED_OUT',
					user: null
				});
			}
		});

		return { unsubscribe: data.subscription.unsubscribe };
	}

	async login(email: string, password: string) {
		const { error } = await this.supabase.auth.signInWithPassword({ email, password });
		if (error) {
			throw error;
		}
	}

	async logout() {
		const { error } = await this.supabase.auth.signOut();
		if (error) throw error;
	}
}
