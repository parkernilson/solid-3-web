import type { HasId } from '$lib/model/domain/HasId';
import type { PaginatedRequest, PaginatedResponse, StartKeyType } from '$lib/utils/types';
import { CollectionModel } from './CollectionModel.svelte';
import type { DataModel } from './DataModel.svelte';
import type { ListDataStructure } from './ListDataStructure.svelte';

export abstract class PaginatedCollectionModel<
	T extends HasId,
	StartKey extends StartKeyType = StartKeyType,
	DM extends DataModel<T> = DataModel<T>,
	DS extends ListDataStructure<DM> = ListDataStructure<DM>
> extends CollectionModel<T, DM, DS> {
	public hasMore: boolean = $state(true);
	private defaultPageSize = 10;
	private initialPageSize = 50;

	protected abstract sendGetMoreItems(request: PaginatedRequest<StartKey>): Promise<PaginatedResponse<T, StartKey>>;

	protected abstract getLastKey(): StartKey | undefined;

	public async loadMoreItems(pageSize?: number): Promise<void> {
		const curLastKey = this.getLastKey();
		const { hasMore, items } = await this.sendGetMoreItems({
			pageSize: pageSize ?? this.defaultPageSize,
			exclusiveStartKey: curLastKey
		});
		this.hasMore = hasMore;
		this.addItems(items);
	}

	protected loadData(): Promise<T[]> {
		throw new Error('PaginatedCollectionModel: loadData is not appropriate for a paginated collection');
	}

	protected async sendLoad() {
		await this.loadMoreItems(this.initialPageSize);
	}
}