import type { CompareFn } from '../types';

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
