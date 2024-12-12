import type { Entry } from '$lib/model/goals';
import { ErrorService } from '$lib/services/ErrorService.svelte';
import { GoalService } from '$lib/services/GoalService.svelte';
import { bisectLeft } from '$lib/utils/arrays/bisect-left';
import type { PaginatedRequest } from '$lib/utils/types/pagination/PaginatedRequest';
import { GoalServicePresenter } from './GoalServicePresenter.svelte';

export class EntryGalleryPresenter extends GoalServicePresenter {
	private _entries = $state<Entry[]>([]);
	private _hasMoreEntries = $state(true);
	private _loadingMoreEntries = $state(false);

	get entries() {
		return this._entries;
	}
	private set entries(e) {
		this._entries = e;
	}
	get hasMoreEntries() {
		return this._hasMoreEntries;
	}
	private set hasMoreEntries(h) {
		this._hasMoreEntries = h;
	}
	get loadingMoreEntries() {
		return this._loadingMoreEntries;
	}
	private set loadingMoreEntries(l) {
		this._loadingMoreEntries = l;
	}

	constructor(
		private goalId: string,
		goalService: GoalService,
		errorService: ErrorService
	) {
		super(errorService, goalService);
	}

	static make(goalId: string) {
		return new EntryGalleryPresenter(goalId, GoalService.make(), ErrorService.instance());
	}

	async loadMoreEntries() {
		if (!this.hasMoreEntries || this.loading) return;
		const lastEntry = this.entries?.[this.entries.length - 1];
		await this.loadEntries({ pageSize: 12, exclusiveStartKey: lastEntry?.date_of });
	}

	async loadEntries({ pageSize, exclusiveStartKey }: PaginatedRequest): Promise<void> {
		try {
			this.loadingMoreEntries = true;

			const { data: entriesData, hasMore } = await this.goalService.getEntriesPaginated(
				this.goalId,
				{
					pageSize,
					exclusiveStartKey
				}
			);

			this.entries = [...(this.entries ?? []), ...entriesData];
			this.hasMoreEntries = hasMore;
		} catch (e) {
			this.errorService.reportError(e);
		} finally {
			this.loadingMoreEntries = false;
		}
	}

	async loadResource(): Promise<void> {
		await this.loadEntries({ pageSize: 10, exclusiveStartKey: null });
	}

	private async addEntryLocal(entry: Entry) {
		const insertIndex = bisectLeft(this.entries, entry, true, 0, this.entries.length, (a, b) =>
			a.date_of.localeCompare(b.date_of)
		);
		this.entries = [
			...this.entries.slice(0, insertIndex),
			entry,
			...this.entries.slice(insertIndex)
		];
	}

	private async updateEntryLocal(entry: Entry) {
		this.entries = this.entries.map((e) => (e.id === entry.id ? entry : e));
	}

	async upsertEntryLocal(entry: Entry) {
		const entryIndex = this.entries.findIndex((e) => e.id === entry.id);
		if (entryIndex === -1) {
			this.addEntryLocal(entry);
		} else {
			this.updateEntryLocal(entry);
		}
	}

	async removeEntryLocal(entryId: string) {
		this.entries = this.entries.filter((e) => e.id !== entryId);
	}
}
