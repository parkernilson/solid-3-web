import type { KeyFn } from '$lib/model/domain/KeyFn';
import { immutableSplice, isSortedBy } from '$lib/utils/arrays';
import { bisectLeftBy } from '$lib/utils/arrays/bisect-left';
import { ListDataStructure } from './ListDataStructure.svelte';

export class SortedListDataStructure<SortT, T extends SortT = SortT> extends ListDataStructure<T> {
	// NOTE: These need to be getters because the parent class will use them in the constructor
	private get isSorted() {
		return isSortedBy<SortT, T>(this.compare);
	}
	private get bisectLeft() {
		return bisectLeftBy<SortT, T>(this.compare);
	}

	constructor(
		key: KeyFn<T>,
		private compare: (a: SortT, b: SortT) => number
	) {
		super(key);
	}

	add(item: T): void {
		if (this.get(this.key(item))) {
			throw new Error('Item with that id already exists');
		}
		const index = this.bisectLeft(this.items, item);
		this.items = immutableSplice(this.items, index, 0, item);
	}
	addItems(items: T[]): void {
		if (!this.isSorted(items)) {
			throw new Error('Items are not sorted');
		}
		this.items = [...this.items, ...items].sort(this.compare);
	}
	/** Items must each have a unique identity according to the key function */
	setItems(items: T[]): void {
		if (!this.isSorted(items)) {
			throw new Error('Items are not sorted');
		}
		this.items = items;
	}
	getLastItem(): T | undefined {
		return this.items[this.items.length - 1];
	}
}
