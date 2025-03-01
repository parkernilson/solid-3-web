import type { CompareFn } from '../types';

/**
 * Extends a given comparator to handle null and undefined values by treating them as 
 * less than or greater than non-null values.
 * @param compare
 * @param lt True if nullish values should be considered less than non-nullish values. Otherwise they are considered greater than.
 * @returns
 */
export const compareNullable =
	<T>(compare: CompareFn<T>, lt: boolean = true) =>
	(a: T | null | undefined, b: T | null | undefined) => {
		if (!a && !b) {
			return 0;
		} else if (!a) {
			return lt ? -1 : 1;
		} else if (!b) {
			return lt ? 1 : -1;
		}
		return compare(a, b);
	};
