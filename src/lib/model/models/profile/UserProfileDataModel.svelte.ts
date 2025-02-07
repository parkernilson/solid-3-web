import type { IUserProfile } from "$lib/model/domain/users";
import type { AuthService } from "$lib/services/AuthService.svelte";
import type { ProfileService } from "$lib/services/ProfileService.svelte";
import { DataModel } from "../base/DataModel.svelte";

export class UserProfileDataModel extends DataModel<IUserProfile> {
    constructor(
        private authService: AuthService,
        private profileService: ProfileService,
        private userId: string,
        initialData?: IUserProfile
    ) {
        super(initialData);
    }

    public async optimisticUpdateProfilePicture(file: Blob): Promise<void> {
        // TODO: make this use the generic update method (make it accept a function as param)
        if (!this.data) throw new Error("No user profile data to update");
        const oldProfileImageUrl = this.data.profileImageUrl;
        try {
            const { imageUrl } = await this.profileService.updateProfileImage(this.userId, file);
            this.data.profileImageUrl = imageUrl;
        } catch(e) {
            this.data.profileImageUrl = oldProfileImageUrl;
            throw e;
        } 
    }

    protected sendUpdate(): Promise<IUserProfile> {
        throw new Error("Method not implemented.");
    }

    async load(): Promise<void> {
        const userProfile = await this.authService.getUserProfile(this.userId);
        this.setData(userProfile?.toJson());
    }
}