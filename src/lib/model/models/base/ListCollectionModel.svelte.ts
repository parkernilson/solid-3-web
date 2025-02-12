import { filterUndefined } from '$lib/utils/types';
import type { HasId } from '../../domain/Id';
import { CollectionModel } from './CollectionModel.svelte';
import type { DataModel } from './DataModel.svelte';
import { ListDataStructure } from './ListDataStructure.svelte';

export abstract class ListCollectionModel<
	T extends HasId,
	DM extends DataModel<T> = DataModel<T>
> extends CollectionModel<T, DM, ListDataStructure<DM>> {
	private _data = $derived(
		this.dataStructure.items
			? filterUndefined(this.dataStructure.items.map((m) => m.data))
			: undefined
	);

	get data() {
		return this._data;
	}
	private set data(data: T[] | undefined) {
		this._data = data;
	}

	constructor(dataStructure: ListDataStructure<DM>, initialData?: T[]) {
		super(dataStructure, initialData);
	}
}
