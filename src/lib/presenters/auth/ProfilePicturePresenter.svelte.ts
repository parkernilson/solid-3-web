import { UserProfile } from '$lib/model/domain/users';
import type { ProfileService } from '$lib/services/ProfileService.svelte';

export class ProfilePicturePresenter {
    get profileImageUrl() {
        if (!this.imagePath) {
            return UserProfile.defaultProfileImagePath();
        }
        return this.profileService.getImageUrlFromPath(this.userId, this.imagePath);
    }

    get userId(): string {
        return this._userId;
    }

	constructor(
		private profileService: ProfileService,
		private _userId: string,
		private imagePath?: string
	) {}
}
