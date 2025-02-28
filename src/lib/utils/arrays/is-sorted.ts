import type { CompareFn } from '../types';

export const isSortedBy =
	<U, T extends U = U>(compare: CompareFn<U>) =>
	(items: T[], descending = false): boolean => {
		for (let i = 1; i < items.length; i++) {
			if (descending ? compare(items[i - 1], items[i]) < 0 : compare(items[i - 1], items[i]) > 0) {
				return false;
			}
		}
		return true;
	};
