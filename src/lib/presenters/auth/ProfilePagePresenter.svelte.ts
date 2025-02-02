import type { UserProfileDataModel } from "$lib/model/models/profile/UserProfileDataModel.svelte";
import type { AuthService } from "$lib/services/AuthService.svelte";
import type { ErrorService } from "$lib/services/ErrorService.svelte";
import { LoadablePresenter } from "../LoadablePresenter.svelte";

export class ProfilePagePresenter extends LoadablePresenter {
    get profile() { return this.profileDataModel.data }

    async logout() {
        this.doErrorable({
            action: async () => {
                await this.authService.logout();
            }
        })
    }

    constructor(errorService: ErrorService, private authService: AuthService, private profileDataModel: UserProfileDataModel) {
        super(errorService);
    }
    protected async loadResource(): Promise<void> {
        await this.profileDataModel.load();
    }
}