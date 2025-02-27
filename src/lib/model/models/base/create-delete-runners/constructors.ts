import type { KeyFn } from '$lib/model/domain/KeyFn';
import type { CollectionModel } from '../CollectionModel.svelte';
import type { DataModel } from '../DataModel.svelte';
import type { CreateDeleteRunner } from './CreateDeleteRunner.svelte';

export type CreateDeleteRunnerConstructor<T, CreateTParams, DM extends DataModel<T>> = (
	model: CollectionModel<T, CreateTParams, DM>,
	key: KeyFn<T>,
) => CreateDeleteRunner<T, CreateTParams, DM>;
