import type { KeyFn } from '$lib/model/domain/KeyFn';
import { filterUndefined } from '$lib/utils/types';
import type { HasId } from '../../domain/HasId';
import { CollectionModel } from './CollectionModel.svelte';
import type { CreateDeleteRunnerConstructor } from './create-delete-runners';
import type { DataModel } from './DataModel.svelte';
import { ListDataStructure } from './data-structures';

export abstract class ListCollectionModel<
	T extends HasId,
	CreateTParams,
	DM extends DataModel<T>
> extends CollectionModel<T, CreateTParams, DM> {
	protected get items() {
		return this._dataStructure.items;
	}

	private _dataStructure = $state<ListDataStructure<DM>>()!;
	private _data = $derived(filterUndefined(this._dataStructure.items.map((m) => m.data)));

	get data() {
		return this._data;
	}
	get models() {
		return this._dataStructure.items;
	}

	constructor(
		dataStructure: ListDataStructure<DM>,
		key: KeyFn<T>,
		initialData?: T[],
		cdRunnerConstructor?: CreateDeleteRunnerConstructor<T, CreateTParams, DM>
	) {
		super(dataStructure, key, initialData, cdRunnerConstructor);
		this._dataStructure = dataStructure;
	}
}
