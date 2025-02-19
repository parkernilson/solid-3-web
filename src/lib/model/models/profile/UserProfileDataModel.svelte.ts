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

    public async updateProfilePicture(file: Blob): Promise<void> {
        if (!this.data) throw new Error("No user profile data to update");
        const { imagePath } = await this.profileService.updateProfileImage(file);
        this.data.profileImagePath = imagePath;
    }

    protected sendUpdate(): Promise<IUserProfile> {
        throw new Error("Method not implemented.");
    }

    async sendLoad(): Promise<void> {
        const userProfile = await this.authService.getUserProfile(this.userId);
        this.setData(userProfile?.toJson());
    }
}