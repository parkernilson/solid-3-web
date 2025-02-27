import type { IdType } from '$lib/model/domain/HasId';
import { DataStructure } from './DataStructure.svelte';

export class ListDataStructure<T> extends DataStructure<T> {
	private _items = $state<T[]>();
	get items() {
		return this._items;
	}
	private set items(i) {
		this._items = i;
	}

	get(id: IdType): T | undefined {
		return this.items?.find((item) => this.key(item) === id);
	}
	add(item: T): void {
		if (!this.items) this.items = [];
		const i = this.items.findIndex((existingItem) => this.key(existingItem) === this.key(item));
		if (!i || i === -1) {
			this.items.push(item);
		} else {
            throw new Error('Item already exists');
		}
	}
	setItems(data: T[]): void {
		this.items = data;
	}
	addItems(data: T[]): void {
		this.items = [...(this.items ?? []), ...data];
	}
	remove(id: IdType): void {
		if (!this.items) throw new Error('Items not initialized');
		const i = this.items.findIndex((item) => this.key(item) === id);
		if (i !== -1) {
			this.items.splice(i, 1);
		}
	}
	update(id: IdType, newItem: T): void {
		if (!this.items) throw new Error('Items not initialized');
		const i = this.items.findIndex((item) => this.key(item) === id);
		if (i === -1) {
			throw new Error('Item not found');
		}
		this.items[i] = newItem;
	}
}
