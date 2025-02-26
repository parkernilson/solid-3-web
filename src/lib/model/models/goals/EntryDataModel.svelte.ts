import { Entry, type EntryUpdateOptimisticParams, type IEntry } from '$lib/model/domain/goals';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { type DataModelInit } from '../base/DataModel.svelte';
import { UpdatableDataModel } from '../base/UpdatableDataModel.svelte';
import type { ConcurrentUpdateRunnerConstructor } from '../base/update-runners';

export class EntryDataModel extends UpdatableDataModel<IEntry, EntryUpdateOptimisticParams, string> {
	constructor(
		private goalService: GoalService,
		updateRunnerConstructor: ConcurrentUpdateRunnerConstructor<IEntry>,
		entryId: string,
		init: DataModelInit<IEntry> = {}
	) {
		super(updateRunnerConstructor, entryId, init);
	}
    
	protected loadData(): Promise<IEntry> {
		throw new Error('Method not implemented.');
	}

	protected getOptimisticUpdateT(currentValue: IEntry, params: EntryUpdateOptimisticParams): IEntry {
		return Entry.fromJson(currentValue).getAppliedUpdateOptimistic(params);
	}

	public async updateEntry(params: EntryUpdateOptimisticParams): Promise<IEntry> {
		return this.update({
			optimisticParams: params,
			sendUpdate: async () => {
				return this.goalService.updateEntry(this.id, params);
			}
		})
	}
}
