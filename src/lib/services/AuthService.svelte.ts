import { type User } from '@supabase/supabase-js';
import { SupabaseService } from './SupabaseService.svelte';
import { supabase } from '$lib/supabase/supabase';
import { ErrorService } from './ErrorService.svelte';

export class AuthService extends SupabaseService {
	private _user = $state<User>();

	public get user() {
		return this._user;
	}

	private set user(u) {
		this._user = u;
	}

	static make() {
		return new AuthService(supabase, ErrorService.instance());
	}

	static instance() {
		return instance;
	}

	async setupAuthStateListener() {
		const { data: initialUserData, error: initialUserError } = await this.supabase.auth.getUser();

		if (initialUserError) throw initialUserError;

		if (initialUserData) {
			this.user = initialUserData.user;
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
		return this.supabase.auth.signInWithPassword({ email, password });
	}

	async logout() {
		return this.supabase.auth.signOut();
	}
}

const instance = AuthService.make();
