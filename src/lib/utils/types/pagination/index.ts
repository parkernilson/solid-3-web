import type { HasId } from "$lib/model/domain/HasId";

export type StartKeyType = string | number;

export interface PaginatedRequest<Key extends StartKeyType = StartKeyType> {
	pageSize: number;
	exclusiveStartKey?: Key | null;
}

export interface PaginatedResponse<T extends HasId, Key extends StartKeyType = StartKeyType> {
	items: T[];
	hasMore: boolean;
	lastKey?: Key;
}