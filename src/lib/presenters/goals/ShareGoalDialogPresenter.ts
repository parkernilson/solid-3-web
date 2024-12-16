import { Goal, UserProfile } from '$lib/model/domain/goals';
import type { ShareRecord } from '$lib/model/domain/goals/ShareRecord';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { SupabaseGoalService } from '$lib/services/SupabaseGoalService.svelte';
import { debounce } from '$lib/utils/debounce/debounce';
import { LoadablePresenter } from '../LoadablePresenter.svelte';

export class ShareGoalDialogPresenter extends LoadablePresenter<{ goalId: string }> {
	private _searchTerm = $state<string>();
	private _shareRecords = $state<ShareRecord[]>();
	private _displayedUsers = $state<UserProfile[]>();
	private _loadingMoreUsers = $state(false);
	private _hasMoreUsers = $state(true);

	get goal() {
		return this._goal;
	}
	get searchTerm() {
		return this._searchTerm;
	}
	private set searchTerm(value: string | undefined) {
		this._searchTerm = value;
	}
	get shareRecords() {
		return this._shareRecords;
	}
	private set shareRecords(value: ShareRecord[] | undefined) {
		this._shareRecords = value;
	}
	get displayedUsers() {
		return this._displayedUsers;
	}
	private set displayedUsers(value: UserProfile[] | undefined) {
		this._displayedUsers = value;
	}
	get loadingMoreUsers() {
		return this._loadingMoreUsers;
	}
	private set loadingMoreUsers(value: boolean) {
		this._loadingMoreUsers = value;
	}
	get hasMoreUsers() {
		return this._hasMoreUsers;
	}
	private set hasMoreUsers(value: boolean) {
		this._hasMoreUsers = value;
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

	@debounce(300)
	async resetSearchTermDebounced(searchTerm: string): Promise<void> {
		await this.resetSearchTerm(searchTerm);
	}

	async resetSearchTerm(searchTerm: string): Promise<void> {
		this.searchTerm = searchTerm;
		this.displayedUsers = undefined;
		this.hasMoreUsers = true;
		await this.loadMoreUsers();
	}

	async loadMoreUsers(): Promise<void> {
		this.doErrorable({
			action: async () => {
				if (!this.searchTerm) return;

				this.loadingMoreUsers = true;
				const exclusiveStartKey =
					(this.displayedUsers?.length ?? 0 > 0)
						? this.displayedUsers?.[this.displayedUsers.length - 1].email
						: undefined;
				const { data: users, hasMore } = await this.goalService.getUsersPaginated(this.searchTerm, {
					pageSize: 10,
					exclusiveStartKey
				});
				this.hasMoreUsers = hasMore;
				this.displayedUsers = this.displayedUsers ? this.displayedUsers.concat(users) : users;
			},
			onFinally: () => {
				this.loadingMoreUsers = false;
			}
		});
	}
}
