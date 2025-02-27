import type { ModelFactory } from '$lib/factories/models/ModelFactory.svelte';
import { Entry, type EntryCreateParams, type IEntry } from '$lib/model/domain/goals';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { type PaginatedRequest, type PaginatedResponse } from '$lib/utils/types';
import type { CreateDeleteRunner, CreateDeleteRunnerConstructor } from '../base/create-delete-runners';
import { ListDataStructure } from '../base/ListDataStructure.svelte';
import { PaginatedCollectionModel } from '../base/PaginatedCollectionModel.svelte';
import { EntryDataModel } from './EntryDataModel.svelte';

type EntryCollectionCDRunnerConstructor = CreateDeleteRunnerConstructor<IEntry, EntryCreateParams, EntryDataModel>;
type EntryCollectionCDRunner = CreateDeleteRunner<IEntry, EntryCreateParams, EntryDataModel>;

export class EntryCollectionModel extends PaginatedCollectionModel<IEntry, EntryDataModel> {
	public get creating() {
		return this.createDeleteRunner.creating;
	}

	public get deleting() {
		return this.createDeleteRunner.deleting;
	}

	private createDeleteRunner: EntryCollectionCDRunner;

	constructor(
		private goalService: GoalService,
		private modelFactory: ModelFactory,
		cdRunnerConstructor: EntryCollectionCDRunnerConstructor,
		dataStructure: ListDataStructure<EntryDataModel>,
        private goalId: string,
		private shared: boolean,
		initialData?: IEntry[]
	) {
		super(dataStructure, (t) => t.id, initialData);
		this.createDeleteRunner = cdRunnerConstructor(this, (t) => t.id, Entry.createOptimistic);
	}

	protected makeConstituentDataModel(data: IEntry): EntryDataModel {
		return this.modelFactory.createEntryDataModel(data.id, { initialData: data })
	}
    protected async sendGetMoreItems(request: PaginatedRequest<string>): Promise<PaginatedResponse<IEntry, string>> {
		return this.goalService.getEntriesPaginated(this.goalId, request);
    }
    protected getStartKey(lastItem?: IEntry): string | undefined {
		return lastItem?.dateOf;
    }

	async createEntry(params: Omit<EntryCreateParams, 'goal'>): Promise<void> {
		const createParams = { ...params, goal: this.goalId }

		await this.createDeleteRunner.create({
			createParams,
			optimistic: true,
			sendCreate: async (createParams) => {
				return this.goalService.createEntry({
					...createParams,
					goalId: createParams.goal
				});
			}
		});
	}
    
}
