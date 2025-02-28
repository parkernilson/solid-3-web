import type { ModelFactory } from '$lib/factories/models/ModelFactory.svelte';
import { type EntryCreateParams, type IEntry } from '$lib/model/domain/goals';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { type PaginatedRequest, type PaginatedResponse } from '$lib/utils/types';
import type { CreateDeleteRunnerConstructor } from '../base/create-delete-runners';
import { SortedListDataStructure } from '../base/data-structures';
import { PaginatedCollectionModel } from '../base/PaginatedCollectionModel.svelte';
import { EntryDataModel } from './EntryDataModel.svelte';

type EntryCollectionCDRunnerConstructor = CreateDeleteRunnerConstructor<
	IEntry,
	EntryCreateParams,
	EntryDataModel
>;

export class EntryCollectionModel extends PaginatedCollectionModel<
	IEntry,
	EntryCreateParams,
	EntryDataModel
> {
	private static initialPageSize = 210;

	constructor(
		private goalService: GoalService,
		private modelFactory: ModelFactory,
		cdRunnerConstructor: EntryCollectionCDRunnerConstructor,
		dataStructure: SortedListDataStructure<EntryDataModel>,
		private goalId: string,
		private shared: boolean,
		initialData?: IEntry[]
	) {
		super(
			dataStructure,
			(t) => t.id,
			EntryCollectionModel.initialPageSize,
			initialData,
			cdRunnerConstructor
		);
	}

	protected makeConstituentDataModel(data: IEntry): EntryDataModel {
		return this.modelFactory.createEntryDataModel(data.id, { initialData: data });
	}
	protected async sendGetMoreItems(
		request: PaginatedRequest<string>
	): Promise<PaginatedResponse<IEntry, string>> {
		return this.goalService.getEntriesPaginated(this.goalId, request);
	}
	protected getStartKey(lastItem?: IEntry): string | undefined {
		return lastItem?.dateOf;
	}

	async createEntry(params: Omit<EntryCreateParams, 'goal'>): Promise<void> {
		if (this.shared) throw new Error('Cannot create entry in shared collection');

		const createParams = { ...params, goal: this.goalId };

		await this.create({
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
