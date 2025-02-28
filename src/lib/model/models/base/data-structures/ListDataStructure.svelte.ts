import type { IdType } from '$lib/model/domain/HasId';
import type { KeyFn } from '$lib/model/domain/KeyFn';
import { DataStructure } from './DataStructure.svelte';

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
	addItems(items: T[]): void {
		for (const item of items) {
			this.add(item);
		}
	}
	remove(id: IdType): void {
		const i = this.items.findIndex((item) => this.key(item) === id);
		if (i !== -1) {
			this.items.splice(i, 1);
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
