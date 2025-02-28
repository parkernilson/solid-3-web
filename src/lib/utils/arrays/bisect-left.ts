import type { CompareFn } from '../types';

export const bisectLeftBy =
	<U, T extends U = U>(compare: CompareFn<U>) =>
	(arr: T[], target: U, descending = false, lo = 0, hi = arr.length): number => {
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if (descending ? compare(arr[mid], target) > 0 : compare(arr[mid], target) < 0) {
				lo = mid + 1;
			} else {
				hi = mid;
			}
		}
		return lo;
	};
