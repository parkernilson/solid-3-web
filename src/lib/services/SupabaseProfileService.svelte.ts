import type { SupabaseDomainConverter } from '$lib/model/converters/supabase/SupabaseDomainConverter';
import type { SupabaseClient } from '$lib/supabase/supabase';
import type { ProfileService, UpdateProfileImageResponse } from './ProfileService.svelte';

export class SupabaseProfileService implements ProfileService {
    constructor(
        private supabase: SupabaseClient,
        private converter: SupabaseDomainConverter
    ) {}

	async updateProfileImage(userId: string, file: Uint32Array): Promise<UpdateProfileImageResponse> {
		throw new Error('Method not implemented.');
	}
}
