type CompareFunc<T> = (a: T, b: T) => number;

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