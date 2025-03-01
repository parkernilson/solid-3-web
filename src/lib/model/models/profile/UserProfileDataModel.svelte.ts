import type { IUserProfile } from '$lib/model/domain/users';
import type { AuthService } from '$lib/services/AuthService.svelte';
import type { ProfileService } from '$lib/services/ProfileService.svelte';
import { DataModel, type DataModelInit } from '../base/DataModel.svelte';

export class UserProfileDataModel extends DataModel<IUserProfile> {
	constructor(
		private authService: AuthService,
		private profileService: ProfileService,
		private userId: string,
		init: DataModelInit<IUserProfile>
	) {
		super(userId, init);
	}

	public async updateProfilePicture(file: Blob): Promise<void> {
		if (!this.data) throw new Error('No user profile data to update');
		const { imagePath } = await this.profileService.updateProfileImage(file);
		this.data.profileImagePath = imagePath;
	}

    protected async loadData(): Promise<IUserProfile> {
        const profile = await this.authService.getUserProfile(this.userId);
        if (!profile) throw new Error('User profile not found');
        return profile;
    }
}
