import { UserProfile } from '$lib/model/domain/goals';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { ErrorHandlingPresenter } from '../ErrorHandlingPresenter';

export class UserSelectCancelError extends Error {
	constructor() {
		super('User select action cancelled');
	}
}

export type UserSelectAction = (user: UserProfile) => Promise<void> | void;

export class UserPickerPresenter extends ErrorHandlingPresenter {
	private _selectedUsers = $state<UserProfile[]>();
	private _displayedUsers = $state<UserProfile[]>();
	private _searchTerm = $state<string>('');
	private _loadingMoreUsers = $state(false);
	private _hasMoreUsers = $state(true);

	private timerId: NodeJS.Timeout | null = null;
	private timeoutMs = 300;

	get selectedUsers() {
		return this._selectedUsers;
	}
	private set selectedUsers(value: UserProfile[] | undefined) {
		this._selectedUsers = value;
	}
	get displayedUsers() {
		return this._displayedUsers;
	}
	private set displayedUsers(value: UserProfile[] | undefined) {
		this._displayedUsers = value;
	}
	get searchTerm() {
		return this._searchTerm;
	}
	private set searchTerm(value: string) {
		this._searchTerm = value;
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
		errorService: ErrorService,
		private goalService: GoalService,
		private excludeSelf: boolean,
		initialSelectedUsers: UserProfile[] = [],
		private beforeSelect: UserSelectAction = () => {},
		private onSelect: UserSelectAction = () => {},
		private beforeDeselect: UserSelectAction = () => {},
		private onDeselect: UserSelectAction = () => {}
	) {
		super(errorService);
		this.selectedUsers = initialSelectedUsers;
	}

	async handleSelectAction(action: 'select' | 'deselect', user: UserProfile) {
		const selectedUsersSnapshot = [...(this.selectedUsers ?? [])];
		try {
			if (action === 'select') {
				await this.selectUser(user);
			} else {
				await this.deselectUser(user);
			}
		} catch (e) {
			if (e instanceof UserSelectCancelError) {
				return;
			}
			this.errorService.handleError(e);
			this.selectedUsers = selectedUsersSnapshot;
		}
	}

	private async selectUser(user: UserProfile): Promise<void> {
		if (this.selectedUsers?.find((u) => u.email === user.email)) {
			return;
		}
		await this.beforeSelect?.(user);
		this.selectedUsers = [...(this.selectedUsers ?? []), user];
		await this.onSelect?.(user);
	}

	private async deselectUser(user: UserProfile): Promise<void> {
		if (!this.selectedUsers?.find((u) => u.email === user.email)) {
			return;
		}
		await this.beforeDeselect?.(user);
		this.selectedUsers = this.selectedUsers?.filter((u) => u.email !== user.email);
		await this.onDeselect?.(user);
	}

	async resetSearchTermDebounced(searchTerm: string | undefined): Promise<void> {
		if (this.timerId) clearTimeout(this.timerId);
		this.timerId = setTimeout(async () => {
			if (!searchTerm || searchTerm.length < 3) {
				return;
			}
			await this.resetSearchTerm(searchTerm);
		}, this.timeoutMs);
	}

	private async resetSearchTerm(searchTerm: string): Promise<void> {
		this.searchTerm = searchTerm;
		if (!searchTerm || searchTerm.length < 3) {
			return;
		}
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
				const { data: users, hasMore } = await this.goalService.getUsersPaginated(
					this.searchTerm,
					this.excludeSelf,
					{
						pageSize: 10,
						exclusiveStartKey
					}
				);
				this.hasMoreUsers = hasMore;
				this.displayedUsers = this.displayedUsers ? this.displayedUsers.concat(users) : users;
			},
			onFinally: () => {
				this.loadingMoreUsers = false;
			}
		});
	}
}
