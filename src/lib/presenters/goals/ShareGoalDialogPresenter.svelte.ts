import { Goal, UserProfile } from '$lib/model/domain/goals';
import type { ShareRecord } from '$lib/model/domain/goals/ShareRecord';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import type { Dialog, DialogPresenter } from '../DialogPresenter.svelte';
import { LoadablePresenter } from '../LoadablePresenter.svelte';
import { UserSelectCancelError } from '../users/UserPickerPresenter.svelte';

export class ShareGoalDialogPresenter extends LoadablePresenter<{ goalId: string }> {
	private _shareRecords = $state<ShareRecord[]>();
	private _sharedWithUsers = $derived(this.shareRecords?.map((rec) => rec.user) ?? []);

	get goal() {
		return this._goal;
	}
	get shareRecords() {
		return this._shareRecords;
	}
	private set shareRecords(value: ShareRecord[] | undefined) {
		this._shareRecords = value;
	}
	get sharedWithUsers() {
		return this._sharedWithUsers;
	}

	constructor(
		private _goal: Goal,
		private goalService: GoalService,
		errorService: ErrorService,
		private dialogPresenter: DialogPresenter
	) {
		super(errorService);
	}

	async loadResource({ goalId }: { goalId: string }): Promise<void> {
		this.shareRecords = await this.goalService.getSharedWithUsers(goalId);
	}

	private getShareDialog(action: 'share' | 'unshare', user: UserProfile): Dialog {
		return {
			content: {
				title: action === 'share' ? 'Share Goal' : 'Unshare Goal',
				body:
					action === 'share'
						? `Are you sure you want to share this goal with ${user.email}?`
						: `Are you sure you want to unshare this goal with ${user.email}?`
			},
			actions: {
				accept: {
					label: action === 'share' ? 'Share' : 'Unshare',
					handle: async () => {
						return {
							action: 'accept'
						};
					}
				},
				cancel: {
					label: 'Cancel',
					handle: async () => {
						return {
							action: 'cancel'
						};
					}
				}
			}
		};
	}

	async confirmShare(user: UserProfile) {
		const dialog = this.getShareDialog('share', user);
		const result = await this.dialogPresenter.showDialog(dialog);
		if (result.action === 'cancel') throw new UserSelectCancelError();
	}

	async doShare(user: UserProfile) {
		// TODO: Implement sharing
		console.log('Sharing goal with ', user.email);
	}

	async confirmUnshare(user: UserProfile) {
		const dialog = this.getShareDialog('unshare', user);
		const result = await this.dialogPresenter.showDialog(dialog);
		if (result.action === 'cancel') throw new UserSelectCancelError();
	}

	async doUnshare(user: UserProfile) {
		// TODO: Implement unsharing
		console.log('Unsharing goal with ', user.email);
	}
}
