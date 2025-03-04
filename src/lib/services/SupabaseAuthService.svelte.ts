import type { SupabaseDomainConverter } from '$lib/model/converters/supabase/SupabaseDomainConverter';
import type { UserProfile } from '$lib/model/domain/users';
import { type SupabaseClient } from '$lib/supabase/supabase';
import { type AuthService } from './AuthService.svelte';

export class SupabaseAuthService implements AuthService {
	private supabase: SupabaseClient;

	constructor(
		supabase: SupabaseClient,
		private converter: SupabaseDomainConverter
	) {
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
