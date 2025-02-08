import type { SupabaseDomainConverter } from '$lib/model/converters/supabase/SupabaseDomainConverter';
import type { SupabaseUserProfile } from '$lib/model/db/supabase/SupabaseUserProfile';
import type { IUserProfile } from '$lib/model/domain/users';
import type { SupabaseClient } from '$lib/supabase/supabase';
import type { ProfileService, UpdateProfileImageResponse } from './ProfileService.svelte';

interface UpdateProfileImageFunctionResponse {
	newPath: string;
}

export class SupabaseProfileService implements ProfileService {
	private updateProfileImageFunctionName = 'update-profile-picture';
	private profilePicturesBucket = 'profile_pictures';

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
			_profile_image_path: newValues.profileImagePath
		});
		if (error) {
			throw error;
		}
		return data;
	}

	async updateProfileImage(file: Blob): Promise<UpdateProfileImageResponse> {
		const { data, error } =
			await this.supabase.functions.invoke<UpdateProfileImageFunctionResponse>(
				this.updateProfileImageFunctionName,
				{
					headers: {
						'X-File-Type': file.type
					},
					body: file
				}
			);
		if (error) throw error;
		if (!data) throw new Error('No data returned from function');
		return { imagePath: data.newPath };
	}

	private getImagePath(userId: string, imagePath: string): string {
		return `${userId}/${imagePath}`;
	}

	public getImageUrlFromPath(userId: string, imagePath: string): string {
		return this.supabase.storage
			.from(this.profilePicturesBucket)
			.getPublicUrl(this.getImagePath(userId, imagePath)).data.publicUrl;
	}
}
