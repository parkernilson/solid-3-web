import { Entry, type EntryCreateParams, type IEntry } from '$lib/model/domain/goals';
import type { KeyFn } from '$lib/model/domain/KeyFn';
import type { CollectionModel } from '$lib/model/models/base/CollectionModel.svelte';
import {
	CreateDeleteRunner
} from '$lib/model/models/base/create-delete-runners';
import type { DataModel } from '$lib/model/models/base/DataModel.svelte';
import type { EntryDataModel } from '$lib/model/models/goals/EntryDataModel.svelte';

export class CreateDeleteRunnerFactory {
	createCDRunner<T, CreateTParams, DM extends DataModel<T>>(
		model: CollectionModel<T, CreateTParams, DM>,
		key: KeyFn<T>,
		getOptimisticCreateT: (params: CreateTParams) => T
	): CreateDeleteRunner<T, CreateTParams, DM> {
		return new CreateDeleteRunner(model, key, getOptimisticCreateT);
	}

	createEntryCollectionCDRunnerConstructor() {
		return (model: CollectionModel<IEntry, EntryCreateParams, EntryDataModel>, key: KeyFn<IEntry>) =>
			this.createCDRunner(
				model,
				key,
				Entry.createOptimistic
			);
	}
}
