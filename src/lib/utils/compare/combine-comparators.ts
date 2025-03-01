type CompareFunc<T> = (a: T, b: T) => number;

/**
 * Combines multiple comparators into a single comparator that compares by each comparator in order. 
 * For example returns the first non-zero result of the comparators, run in the order they are passed in.
 * @param comparators 
 * @returns 
 */
export function combineComparators<T>(...comparators: CompareFunc<T>[]): CompareFunc<T> {
	return (a: T, b: T) =>
		comparators.reduce((result, compare) => {
			if (result !== 0) {
				return result;
			}
			result = compare(a, b);
			return result;
		}, 0);
}