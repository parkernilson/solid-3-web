import { invalidateAll } from '$app/navigation';
import { UserProfile } from '$lib/model/domain/users';
import type { AuthModel } from '$lib/model/models/auth/AuthModel.svelte';
import type { UserProfileDataModel } from '$lib/model/models/profile/UserProfileDataModel.svelte';
import type { AuthService } from '$lib/services/AuthService.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { ProfileService } from '$lib/services/ProfileService.svelte';
import { LoadablePresenter } from '../LoadablePresenter.svelte';

export class ProfilePagePresenter extends LoadablePresenter {
	public profileImgFiles = $state<FileList>();
	public profileImgFile = $derived(this.profileImgFiles?.item(0));

	public selectedImgUrl = $state<string>();

	private _displayedProfileImageUrl = $derived(this.selectedImgUrl || this.profileImageUrl);
	public get displayedProfileImageUrl() {
		return this._displayedProfileImageUrl;
	}

	private _authModel = $state<AuthModel>()!;
	public isCurrentUser = $derived(
		this._authModel.user && this.profile ? this._authModel.user.id === this.profile.id : false
	);

	private _hasEditedProfileImage = $state(false);
	private _updatingProfileImage = $state(false);
	public get hasEditedProfileImage() {
		return this._hasEditedProfileImage;
	}
	private set hasEditedProfileImage(value: boolean) {
		this._hasEditedProfileImage = value;
	}
	public get updatingProfileImage() {
		return this._updatingProfileImage;
	}
	private set updatingProfileImage(value: boolean) {
		this._updatingProfileImage = value;
	}

	async onImageSelected(event: Event) {
		if (event.type !== 'change') return;
		if (!this.profileImgFile) return;

		this.hasEditedProfileImage = true;
		if (this.selectedImgUrl) {
			URL.revokeObjectURL(this.selectedImgUrl);
		}
		const tempUrl = URL.createObjectURL(this.profileImgFile);
		this.selectedImgUrl = tempUrl;
	}

	get mimeFiletypes() {
		return 'image/jpeg, image/png';
	}

	get profile() {
		return this.profileDataModel.data;
	}

	get profileImageUrl() {
		if (!this.profile) throw new Error('Profile not loaded');
		return this.profileDataModel.data?.profileImagePath
			? this.profileService.getImageUrlFromPath(
					this.profile.id,
					this.profileDataModel.data.profileImagePath
				)
			: UserProfile.defaultProfileImagePath();
	}

	async logout() {
		this.doErrorable({
			action: async () => {
				await this.authService.logout();
				invalidateAll();
			}
		});
	}

	constructor(
		errorService: ErrorService,
		private authService: AuthService,
		private authModel: AuthModel,
		private profileDataModel: UserProfileDataModel,
		private userId: string,
		private profileService: ProfileService
	) {
		super(errorService);
		this._authModel = authModel;
	}

	protected async loadResource(): Promise<void> {
		await this.profileDataModel.load();
	}

	public async updateProfileImage() {
		await this.doErrorable({
			action: async () => {
				if (!this.profileImgFile) throw new Error('There was no file to upload');
				this.updatingProfileImage = true;
				await this.profileDataModel.updateProfilePicture(this.profileImgFile);
				this.hasEditedProfileImage = false;
			},
			onFinally: () => {
				this.updatingProfileImage = false;
			}
		});
	}
}
