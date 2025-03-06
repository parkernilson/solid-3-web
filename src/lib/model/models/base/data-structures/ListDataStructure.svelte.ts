import type { IdType } from '$lib/model/domain/HasId';
import type { KeyFn } from '$lib/model/domain/KeyFn';
import { immutableSplice } from '$lib/utils/arrays';
import { DataStructure } from './DataStructure.svelte';

// NOTE: Do not use methods on reactive array that mutate the array in a way that causes a ton of
// re renders. .splice is one example of this.
// Instead, create a new array and then assign it to the reactive array.

export abstract class ListDataStructure<T> extends DataStructure<T> {
	private _items = $state<T[]>()!;
	get items() {
		return this._items;
	}
	protected set items(i) {
		this._items = i;
	}

	constructor(key: KeyFn<T>, initialItems?: T[]) {
		super(key);
		this.setItems(initialItems ?? []);
	}

	get(id: IdType): T | undefined {
		return this.items.find((item) => this.key(item) === id);
	}
	abstract add(item: T): void;
	abstract setItems(items: T[]): void;
	abstract addItems(items: T[]): void;
	remove(id: IdType): void {
		const i = this.items.findIndex((item) => this.key(item) === id);
		if (i !== -1) {
			this.items = immutableSplice(this.items, i, 1);
		}
	}
	update(id: IdType, newItem: T): void {
		const i = this.items.findIndex((item) => this.key(item) === id);
		if (i === -1) {
			throw new Error('Item not found');
		}
		this.items[i] = newItem;
	}
}
