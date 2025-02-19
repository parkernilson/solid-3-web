import type { IEntry } from '$lib/model/domain/goals';
import type { IdType } from '$lib/model/domain/Id';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { filterUndefined } from '$lib/utils/types';
import { ListDataStructure } from '../base/ListDataStructure.svelte';
import { PaginatedCollectionModel, type PaginatedRequest, type PaginatedResponse } from '../base/PaginatedCollectionModel.svelte';
import { EntryDataModel } from './EntryDataModel.svelte';

export class EntryCollectionModel extends PaginatedCollectionModel<
	IEntry,
	EntryDataModel,
	ListDataStructure<EntryDataModel>
> {
	private _data = $derived(
		this.dataStructure.items 
            ? filterUndefined(this.dataStructure.items.map((m) => m.data))
            : undefined
	);
    public get data() {
        return this._data;
    }

	constructor(
		private goalService: GoalService,
		dataStructure: ListDataStructure<EntryDataModel>,
        private goalId: string,
		initialData?: IEntry[]
	) {
		super(dataStructure, initialData);
	}

	protected makeConstituentDataModel(data: IEntry): EntryDataModel {
		return new EntryDataModel(this.goalService, data.id, data);
	}
	protected sendCreate(): Promise<IEntry> {
		throw new Error('Method not implemented.');
	}
	protected sendDelete(): Promise<void> {
		throw new Error('Method not implemented.');
	}
    protected sendGetMoreItems(request: PaginatedRequest<IdType>): Promise<PaginatedResponse<IEntry>> {
        console.log(request);
        throw new Error('Method not implemented.');
    }
    protected getLastKey(): IdType {
        throw new Error('Method not implemented.');
    }
    
	async sendLoad(): Promise<void> {
        const { data, hasMore } = await this.goalService.getEntriesPaginated(this.goalId, {
            pageSize: 50,
            exclusiveStartKey: null
        })
        this.setItems(data);
        this.hasMore = hasMore;
	}
}
