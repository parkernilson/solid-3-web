import type { SupabaseDomainConverter } from '$lib/model/converters/supabase/SupabaseDomainConverter';
import type { SupabaseUserProfile } from '$lib/model/db/supabase/SupabaseUserProfile';
import type { IUserProfile } from '$lib/model/domain/users';
import type { SupabaseClient } from '$lib/supabase/supabase';
import type { ProfileService, UpdateProfileImageResponse } from './ProfileService.svelte';

export class SupabaseProfileService implements ProfileService {
	constructor(
		private supabase: SupabaseClient,
		private converter: SupabaseDomainConverter
	) {}

	private async updateProfile(
		userId: string,
		newValues: Partial<Omit<IUserProfile, 'id'>>
	): Promise<SupabaseUserProfile> {
		const { data, error } = await this.supabase.rpc('update_profile', {
			_user_id: userId,
			_email: newValues.email,
			_profile_image_url: newValues.profileImageUrl
		});
		if (error) {
			throw error;
		}
		return data;
	}

    private async uploadProfileImage(userId: string, file: Blob): Promise<{ imageUrl: string }> {
		const extension = file.type.split('/')[1];      

		// TODO: make sure to format the url such that it works on localhost and prod
		//  - I should store the path, then format the url on the client based on environment
		// TODO: upload the image to a new url (include timestamp) so that the cache is not a problem
		// TODO: delete the old profile image (maybe I should use a cloud function to ensure users do not abuse storage)

        const { data, error } = await this.supabase.storage
            .from('profile_pictures')
            .upload(`${userId}/main_avatar.${extension}`, file, { upsert: true });
        if (error) {
            throw error;
        }
		const url = this.supabase.storage.from('profile_pictures').getPublicUrl(data.path);
        return { imageUrl: url.data.publicUrl };
    }

	async updateProfileImage(userId: string, file: Blob): Promise<UpdateProfileImageResponse> {
		// TODO: instead of doing the logic here, use an update-profile-image cloud function
		// to avoid having to trust the client to keep the storage and profile record in sync
        const { imageUrl } = await this.uploadProfileImage(userId, file);
        await this.updateProfile(userId, { profileImageUrl: imageUrl });
		return { imageUrl };
	}
}
