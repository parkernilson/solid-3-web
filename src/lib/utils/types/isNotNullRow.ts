export type NonNullableRowExcept<T, K extends keyof T> = {
	[P in keyof T]: P extends K ? T[P] : NonNullable<T[P]>;
};

export type NonNullablePick<T, K extends keyof T> = {
	[P in keyof T]: P extends K ? NonNullable<T[P]> : T[P];
};

export type NonNullableRow<T> = {
	[P in keyof T]: NonNullable<T[P]>;
};

export const isNotNullRow = <T extends object>(obj: T): obj is NonNullableRow<T> => {
	return Object.values(obj).every((value) => value !== null);
};

export const isNullRow = <T extends object>(obj: T) => {
	return Object.values(obj).every((value) => value === null);
};

export const isNotNullExcept =
	<T extends object, K extends keyof T = never>({ except }: { except?: K[] } = {}) =>
	(obj: T): obj is NonNullableRowExcept<T, K> => {
		return Object.entries(obj).every(([key, value]) => {
			if (except?.includes(key as K)) {
				return true;
			}
			return value !== null;
		});
	};

export const isNotNullPick =
	<T extends object, K extends keyof T = never>({ keys }: { keys: K[] }) =>
	(obj: T): obj is NonNullablePick<T, K> => {
		return keys.every((key) => {
			const value = obj[key];
			return value !== null;
		});
	};
