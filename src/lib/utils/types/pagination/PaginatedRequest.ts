export interface PaginatedRequest<Key = string> {
    pageSize: number;
    exclusiveStartKey?: Key | null;
}