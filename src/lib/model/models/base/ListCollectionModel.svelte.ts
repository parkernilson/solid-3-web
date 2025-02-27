import type { KeyFn } from '$lib/model/domain/KeyFn';
import { filterUndefined } from '$lib/utils/types';
import type { HasId } from '../../domain/HasId';
import { CollectionModel } from './CollectionModel.svelte';
import type { DataModel } from './DataModel.svelte';
import { ListDataStructure } from './ListDataStructure.svelte';

export abstract class ListCollectionModel<
	T extends HasId,
	DM extends DataModel<T>
> extends CollectionModel<T, DM> {

	protected get items() {
		return this._dataStructure.items;
	}

	private _dataStructure = $state<ListDataStructure<DM>>()!;
	private _data = $derived(
		this._dataStructure.items
			? filterUndefined(this._dataStructure.items.map((m) => m.data))
			: undefined
	);

	get data() {
		return this._data;
	}
	get models() {
		return this._dataStructure.items;
	}
	private set data(data: T[] | undefined) {
		this._data = data;
	}

	constructor(dataStructure: ListDataStructure<DM>, key: KeyFn<T>, initialData?: T[]) {
		super(dataStructure, key, initialData);
		this._dataStructure = dataStructure;
	}
}
