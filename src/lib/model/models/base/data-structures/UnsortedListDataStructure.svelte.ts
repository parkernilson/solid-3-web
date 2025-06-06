import { ListDataStructure } from './ListDataStructure.svelte';

export class UnsortedListDataStructure<T> extends ListDataStructure<T> {
	add(item: T): void {
		if (!this.get(this.key(item))) {
			this.items.push(item);
		} else {
			throw new Error('Item already exists');
		}
	}
	addItems(items: T[]): void {
		this.items.push(...items);
	}
	setItems(data: T[]): void {
		this.items = data;
	}
}
