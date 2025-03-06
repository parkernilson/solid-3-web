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
	DM extends DataModel<T>,
	SK extends StartKeyType = StartKeyType
> extends ListCollectionModel<T, CreateTParams, DM> {
	public hasMore: boolean = $state(true);
	private defaultPageSize = 10;
	private defaultInitialPageSize = 200;

	constructor(
		private sortedList: SortedListDataStructure<DM>,
		key: KeyFn<T>,
		private initialPageSize?: number,
		initialData?: T[],
		cdRunnerConstructor?: CreateDeleteRunnerConstructor<T, CreateTParams, DM>
	) {
		super(sortedList, key, initialData, cdRunnerConstructor);
	}

	protected abstract sendGetMoreItems(
		request: PaginatedRequest<SK>
	): Promise<PaginatedResponse<T, SK>>;

	protected abstract getStartKey(lastItem?: T): SK | undefined;
	protected getLastExclusiveStartKey(): SK | undefined {
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

	/**
	 * WARNING - This method overrides the parent sendLoad method. Be sure to
	 * implement the correct behavior based on the super class.
	 */
	protected async sendLoad() {
		await this.loadMoreItems(this.initialPageSize ?? this.defaultInitialPageSize);
	}
}
