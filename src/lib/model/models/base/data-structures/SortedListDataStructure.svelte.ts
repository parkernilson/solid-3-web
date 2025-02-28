import type { KeyFn } from '$lib/model/domain/KeyFn';
import { isSortedBy } from '$lib/utils/arrays';
import { bisectLeftBy } from '$lib/utils/arrays/bisect-left';
import { ListDataStructure } from './ListDataStructure.svelte';

export class SortedListDataStructure<SortT, T extends SortT = SortT> extends ListDataStructure<T> {
	private bisectLeft;
	private isSorted;

	constructor(
		key: KeyFn<T>,
		private compare: (a: SortT, b: SortT) => number
	) {
		super(key);
		this.bisectLeft = bisectLeftBy<SortT, T>(this.compare);
		this.isSorted = isSortedBy<SortT, T>(this.compare);
	}

	add(item: T): void {
		if (this.get(this.key(item))) {
			throw new Error('Item with that id already exists');
		}
		const index = this.bisectLeft(this.items, item);
		this.items.splice(index, 0, item);
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
