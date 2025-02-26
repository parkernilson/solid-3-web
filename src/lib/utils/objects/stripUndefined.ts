export const stripUndefined = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
	const newObj = Object.entries(obj).reduce((acc, [k, v]) => {
		if (v !== undefined) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(acc as any)[k] = v;
		}

		return acc;
	}, {} as Partial<T>);

	return newObj;
};