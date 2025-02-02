import type { IUserProfile } from "$lib/model/domain/users";
import type { AuthService } from "$lib/services/AuthService.svelte";
import { DataModel } from "../base/DataModel.svelte";

export class UserProfileDataModel extends DataModel<IUserProfile> {
    constructor(
        private authService: AuthService,
        private userId: string,
        initialData?: IUserProfile
    ) {
        super(initialData);
    }

    protected sendUpdate(): Promise<IUserProfile> {
        throw new Error("Method not implemented.");
    }

    async load(): Promise<void> {
        const userProfile = await this.authService.getUserProfile(this.userId);
        this.setData(userProfile?.toJson());
    }
}