import { Entry } from '$lib/model/domain/goals';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { bisectLeft } from '$lib/utils/arrays/bisect-left';
import type { PaginatedRequest } from '$lib/utils/types/pagination/PaginatedRequest';
import { LoadablePresenter } from '../LoadablePresenter.svelte';

export class EntryGalleryPresenter extends LoadablePresenter {
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
		private goalService: GoalService,
		protected errorService: ErrorService
	) {
		super(errorService);
	}

	async loadMoreEntries() {
		if (!this.hasMoreEntries || this.loading) return;
		const lastEntry = this.entries?.[this.entries.length - 1];
		await this.loadEntries({ pageSize: 12, exclusiveStartKey: lastEntry?.dateOf });
	}

	private async loadEntries({ pageSize, exclusiveStartKey }: PaginatedRequest): Promise<void> {
		await this.doErrorable({
			action: async () => {
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
			},
			onFinally: () => {
				this.loadingMoreEntries = false;
			}
		})
	}

	async loadResource(): Promise<void> {
		await this.loadEntries({ pageSize: 10, exclusiveStartKey: null });
	}

	private async addEntryLocal(entry: Entry) {
		const insertIndex = bisectLeft(this.entries, entry, true, 0, this.entries.length, (a, b) =>
			a.dateOf.localeCompare(b.dateOf)
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
