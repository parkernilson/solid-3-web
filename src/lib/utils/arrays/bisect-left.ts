export function bisectLeft<T>(
	arr: T[],
	value: T,
	descending = false,
	lo = 0,
	hi = arr.length,
	compare: (a: T, b: T) => number = (a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0)
): number {
	while (lo < hi) {
		const mid = (lo + hi) >> 1;
		if (descending ? compare(arr[mid], value) > 0 : compare(arr[mid], value) < 0) {
			lo = mid + 1;
		} else {
			hi = mid;
		}
	}
	return lo;
}