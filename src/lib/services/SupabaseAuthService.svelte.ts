import { type SupabaseClient } from '$lib/supabase/supabase';
import { AuthService } from './AuthService.svelte';

export class SupabaseAuthService extends AuthService {
	private supabase: SupabaseClient;

	constructor(
		supabase: SupabaseClient,
	) {
		super();
		this.supabase = supabase;
	}

	async setupAuthStateListener() {
		const { data: initialUserData, error } = await this.supabase.auth.getUser();
		if (error) {
			throw error;
		}

		if (initialUserData) {
			this.user = initialUserData.user!;
		}

		this.supabase.auth.onAuthStateChange((e, session) => {
			if (e === 'INITIAL_SESSION' || e === 'SIGNED_IN') {
				this.user = session?.user;
			} else if (e === 'SIGNED_OUT') {
				this.user = session?.user;
			}
		});
	}

	async login(email: string, password: string) {
		const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
		if (error) {
			throw error;
		}
		return {
			user: data.user,
			session: data.session
		};
	}

	async logout() {
		const { error } = await this.supabase.auth.signOut();
		if (error) throw error;
	}
}
