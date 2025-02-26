import type { ModelFactory } from '$lib/factories/models/ModelFactory.svelte';
import { type IEntry } from '$lib/model/domain/goals';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { filterUndefined, type PaginatedRequest, type PaginatedResponse } from '$lib/utils/types';
import { ListDataStructure } from '../base/ListDataStructure.svelte';
import { PaginatedCollectionModel } from '../base/PaginatedCollectionModel.svelte';
import { EntryDataModel } from './EntryDataModel.svelte';

export class EntryCollectionModel extends PaginatedCollectionModel<
	IEntry,
	string,
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
	public get models() {
		return this.dataStructure.items;
	}

	constructor(
		private goalService: GoalService,
		private modelFactory: ModelFactory,
		dataStructure: ListDataStructure<EntryDataModel>,
        private goalId: string,
		initialData?: IEntry[]
	) {
		super(dataStructure, (t) => t.id, initialData);
	}

	protected makeConstituentDataModel(data: IEntry): EntryDataModel {
		return this.modelFactory.createEntryDataModel(data.id, { initialData: data })
	}
    protected async sendGetMoreItems(request: PaginatedRequest<string>): Promise<PaginatedResponse<IEntry, string>> {
		return this.goalService.getEntriesPaginated(this.goalId, request);
    }
    protected getLastKey(): string | undefined {
		return this.dataStructure.items?.[this.dataStructure.items.length - 1]?.data?.dateOf;
    }
    
}
