export const immutableSplice = <T>(
	arr: T[],
	start: number,
	deleteCount: number,
	...items: T[]
): T[] => {
	const copy = arr.slice();
	copy.splice(start, deleteCount, ...items);
	return copy;
};
