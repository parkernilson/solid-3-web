import type { KeyFn } from '$lib/model/domain/KeyFn';
import type { CollectionModel } from '$lib/model/models/base/CollectionModel.svelte';
import {
	CreateDeleteRunner,
	type CreateDeleteRunnerConstructor
} from '$lib/model/models/base/create-delete-runners';
import type { DataModel } from '$lib/model/models/base/DataModel.svelte';

export class CreateDeleteRunnerFactory {
	createCDRunner<T, CreateTParams, DM extends DataModel<T>>(
		model: CollectionModel<T, DM>,
		key: KeyFn<T>,
		getOptimisticCreateT: (params: CreateTParams) => T
	): CreateDeleteRunner<T, CreateTParams, DM> {
		return new CreateDeleteRunner(model, key, getOptimisticCreateT);
	}

	createCDRunnerConstructor<T, CreateTParams, DM extends DataModel<T>>(): CreateDeleteRunnerConstructor<T, CreateTParams, DM> {
		return this.createCDRunner.bind(this);
	}
}
