import { Goal } from '$lib/model/domain/goals';
import type { ShareRecord } from '$lib/model/domain/goals/ShareRecord';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { SupabaseGoalService } from '$lib/services/SupabaseGoalService.svelte';
import { LoadablePresenter } from '../LoadablePresenter.svelte';

export class ShareGoalDialogPresenter extends LoadablePresenter<{ goalId: string }> {
	private _shareRecords = $state<ShareRecord[]>();
	private _sharedWithUsers = $derived(
		this.shareRecords?.map((rec) => rec.user) ?? [],
	)

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
		private goalService: SupabaseGoalService,
		errorService: ErrorService
	) {
		super(errorService);
	}

	async loadResource({ goalId }: { goalId: string }): Promise<void> {
		this.shareRecords = await this.goalService.getSharedWithUsers(goalId);
	}
}
