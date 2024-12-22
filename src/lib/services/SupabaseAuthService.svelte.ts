import type { SupabaseUserProfile } from '$lib/model/db/supabase/SupabaseUserProfile';
import { type SupabaseClient } from '$lib/supabase/supabase';
import type { User } from '@supabase/supabase-js';
import { AuthService } from './AuthService.svelte';
import type { SupabaseDomainConverter } from '$lib/model/converters/supabase/SupabaseDomainConverter';

export class SupabaseAuthService extends AuthService {
	private supabase: SupabaseClient;

	constructor(
		supabase: SupabaseClient,
		private converter: SupabaseDomainConverter
	) {
		super();
		this.supabase = supabase;
	}

	private async getUserProfile(userId: string): Promise<SupabaseUserProfile> {
		const { data, error } = await this.supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
		if (error) {
			throw error;
		}
		if (!data) {
			throw new Error('User profile not found');
		}
		return data
	}

	private async updateUserInfo(user?: User | null) {
		if (!user) {
			this.user = undefined;
			return;
		} 
		const profile = await this.getUserProfile(user.id);
		this.user = this.converter.convertUserProfile(profile);
	}

	async setupAuthStateListener() {
		const { data: initialUserData, error } = await this.supabase.auth.getUser();
		if (error) {
			throw error;
		}

		if (initialUserData) {
			await this.updateUserInfo(initialUserData.user)
		}

		this.supabase.auth.onAuthStateChange(async (e, session) => {
			if (e === 'INITIAL_SESSION' || e === 'SIGNED_IN') {
				await this.updateUserInfo(session?.user);
			} else if (e === 'SIGNED_OUT') {
				await this.updateUserInfo(null);
			}
		});
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
