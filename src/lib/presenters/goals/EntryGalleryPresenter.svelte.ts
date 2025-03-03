import type { GoalModel } from '$lib/model/models/goals/GoalModel.svelte';
import { Routes } from '$lib/model/routes';
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

	getViewEntryUrl(entryId: string) {
		return Routes.getViewEntryUrl(this.goalId, entryId);
	}

	async loadMoreEntries() {
		if (!this.hasMoreEntries || this.loading) return;
		await this.loadEntries({ pageSize: 200 });
	}

	private async loadEntries({ pageSize }: PaginatedRequest): Promise<void> {
		await this.goalModel.entryCollectionModel.loadMoreItems(pageSize);
	}

	protected async loadResource(): Promise<void> {
		await this.goalModel.entryCollectionModel.loadMoreItems(200);
	}
}
