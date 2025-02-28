import type { HasId } from '$lib/model/domain/HasId';
import type { KeyFn } from '$lib/model/domain/KeyFn';
import type { PaginatedRequest, PaginatedResponse, StartKeyType } from '$lib/utils/types';
import type { CreateDeleteRunnerConstructor } from './create-delete-runners';
import type { DataModel } from './DataModel.svelte';
import { ListCollectionModel } from './ListCollectionModel.svelte';
import type { SortedListDataStructure } from './data-structures';

export abstract class PaginatedCollectionModel<
	T extends HasId,
	CreateTParams,
	DM extends DataModel<T>
> extends ListCollectionModel<T, CreateTParams, DM> {
	public hasMore: boolean = $state(true);
	private defaultPageSize = 10;
	private initialPageSize = 50;

	constructor(
		private sortedList: SortedListDataStructure<DM>,
		key: KeyFn<T>,
		initialData?: T[],
		cdRunnerConstructor?: CreateDeleteRunnerConstructor<T, CreateTParams, DM>
	) {
		super(sortedList, key, initialData, cdRunnerConstructor);
	}

	protected abstract sendGetMoreItems(
		request: PaginatedRequest<StartKeyType>
	): Promise<PaginatedResponse<T, StartKeyType>>;

	protected abstract getStartKey(lastItem?: T): StartKeyType | undefined;
	private getLastExclusiveStartKey(): StartKeyType | undefined {
		return this.getStartKey(this.sortedList.getLastItem()?.data);
	}

	public async loadMoreItems(pageSize?: number): Promise<void> {
		const curLastKey = this.getLastExclusiveStartKey();
		const { hasMore, items } = await this.sendGetMoreItems({
			pageSize: pageSize ?? this.defaultPageSize,
			exclusiveStartKey: curLastKey
		});
		this.hasMore = hasMore;
		this.addItems(items);
	}

	protected loadData(): Promise<T[]> {
		throw new Error(
			'PaginatedCollectionModel: loadData is not appropriate for a paginated collection'
		);
	}

	protected async sendLoad() {
		await this.loadMoreItems(this.initialPageSize);
	}
}
