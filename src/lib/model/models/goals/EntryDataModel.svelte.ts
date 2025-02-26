import type { IEntry } from '$lib/model/domain/goals';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { type DataModelInit } from '../base/DataModel.svelte';
import { UpdatableDataModel } from '../base/UpdatableDataModel.svelte';
import type { ConcurrentUpdateRunnerConstructor } from '../base/update-runners';

export class EntryDataModel extends UpdatableDataModel<IEntry> {
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

	public async updateEntry(entry: IEntry): Promise<void> {
        // TODO: call this.update
	}
}
