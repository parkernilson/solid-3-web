import type { HasId, IdType } from '$lib/model/domain/Id';
import type { IOptimistic } from '$lib/model/domain/Optimistic';
import { CollectionModel } from './CollectionModel.svelte';
import type { DataModel } from './DataModel.svelte';
import type { ListDataStructure } from './ListDataStructure.svelte';

export interface PaginatedRequest<Key extends IdType = IdType> {
	pageSize: number;
	exclusiveStartKey?: Key | null;
}

export interface PaginatedResponse<T extends HasId, Key extends IdType = IdType> {
	items: T[];
	hasMore: boolean;
	lastKey?: Key;
}

export abstract class PaginatedCollectionModel<
	T extends HasId & IOptimistic,
	DM extends DataModel<T> = DataModel<T>,
	DS extends ListDataStructure<DM> = ListDataStructure<DM>
> extends CollectionModel<T, DM, DS> {
	/** Undefined until initial data is loaded */
	public hasMore?: boolean = $state();
	private defaultPageSize = 10;

	protected abstract sendGetMoreItems(request: PaginatedRequest): Promise<PaginatedResponse<T>>;

	protected abstract getLastKey(): IdType;

	protected async loadMoreItems(pageSize?: number): Promise<void> {
		const curLastKey = this.getLastKey();
		const { hasMore, items } = await this.sendGetMoreItems({
			pageSize: pageSize ?? this.defaultPageSize,
			exclusiveStartKey: curLastKey
		});
		this.hasMore = hasMore;
		this.addItems(items);
	}
}