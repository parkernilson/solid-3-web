export type NonNullableRow<T> = {
	[P in keyof T]: NonNullable<T[P]>;
};

export function isNotNullRow<T extends object>(obj: T): obj is NonNullableRow<T> {
	return Object.values(obj).every((value) => value !== null);
}
