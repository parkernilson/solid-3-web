import type { GoalModel } from '$lib/model/models/goals/GoalModel.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import type { PaginatedRequest } from '$lib/utils/types/pagination';
import { LoadablePresenter } from '../LoadablePresenter.svelte';

export class EntryGalleryPresenter extends LoadablePresenter {
	get entryModels() {
		return this.goalModel.entryCollectionModel.models;
	}
	get hasMoreEntries() {
		return this.goalModel.entryCollectionModel.hasMore;
	}
	get loadingMoreEntries() {
		return this.goalModel.entryCollectionModel.loading;
	}

	constructor(
		private goalId: string,
		private goalModel: GoalModel,
		private goalService: GoalService,
		protected errorService: ErrorService
	) {
		super(errorService);
	}

	async loadMoreEntries() {
		if (!this.hasMoreEntries || this.loading) return;
		await this.loadEntries({ pageSize: 12 });
	}

	private async loadEntries({ pageSize }: PaginatedRequest): Promise<void> {
		await this.goalModel.entryCollectionModel.loadMoreItems(pageSize);
	}

	protected async loadResource(): Promise<void> {
		await this.goalModel.entryCollectionModel.loadMoreItems(20);
	}

	// TODO: Re-implement entry updates
	// private async addEntryLocal(entry: Entry) {
	// 	const insertIndex = bisectLeft(this.entries, entry, true, 0, this.entries.length, (a, b) =>
	// 		a.dateOf.localeCompare(b.dateOf)
	// 	);
	// 	this.entries = [
	// 		...this.entries.slice(0, insertIndex),
	// 		entry,
	// 		...this.entries.slice(insertIndex)
	// 	];
	// }

	// private async updateEntryLocal(entry: Entry) {
	// 	this.entries = this.entries.map((e) => (e.id === entry.id ? entry : e));
	// }

	// async upsertEntryLocal(entry: Entry) {
	// 	const entryIndex = this.entries.findIndex((e) => e.id === entry.id);
	// 	if (entryIndex === -1) {
	// 		this.addEntryLocal(entry);
	// 	} else {
	// 		this.updateEntryLocal(entry);
	// 	}
	// }

	// async removeEntryLocal(entryId: string) {
	// 	this.entries = this.entries.filter((e) => e.id !== entryId);
	// }
}
