import { Entry, type EntryUpdateParams, type IEntry } from '$lib/model/domain/goals';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { type DataModelInit } from '../base/DataModel.svelte';
import { UpdatableDataModel } from '../base/UpdatableDataModel.svelte';
import type { ConcurrentUpdateRunner } from '../base/update-runners';

export class EntryDataModel extends UpdatableDataModel<IEntry, EntryUpdateParams> {
	constructor(
		private goalService: GoalService,
		updateRunner: ConcurrentUpdateRunner,
		private entryId: string,
		init: DataModelInit<IEntry>
	) {
		super(updateRunner, entryId, init);
	}

	protected loadData(): Promise<IEntry> {
		return this.goalService.getEntry(this.entryId);
	}

	protected getOptimisticUpdateT(currentValue: IEntry, params: EntryUpdateParams): IEntry {
		return Entry.getAppliedUpdateOptimistic(currentValue, params);
	}

	public async updateEntry(params: EntryUpdateParams): Promise<IEntry> {
		return this.update({
			optimisticParams: params,
			sendUpdate: async () => {
				return this.goalService.updateEntry(this.entryId, params);
			}
		});
	}
}
