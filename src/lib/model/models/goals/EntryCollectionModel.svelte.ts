import type { ModelFactory } from '$lib/factories/models/ModelFactory.svelte';
import {
	type EntryCreateParams,
	type IEntry,
	type UserEntryCreateParams
} from '$lib/model/domain/goals';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { compareNullable } from '$lib/utils/compare';
import { DateEx } from '$lib/utils/dates';
import { type PaginatedRequest, type PaginatedResponse } from '$lib/utils/types';
import type { CreateDeleteRunnerConstructor } from '../base/create-delete-runners';
import { SortedListDataStructure } from '../base/data-structures';
import type { DataModelInit } from '../base/DataModel.svelte';
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
	EntryDataModel,
	string
> {
	private static initialPageSize = 210;

	private todayEntry = $derived(
		this.models.find(
			(m) =>
				compareNullable(DateEx.compareDateOnlyStrings)(
					m.data?.dateOf,
					DateEx.todayDateOnlyString()
				) === 0
		)
	);
	public hasEntryToday = $derived(!!this.todayEntry);

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

	protected makeConstituentDataModel(data: IEntry, init: DataModelInit<IEntry>): EntryDataModel {
		return this.modelFactory.createEntryDataModel(data.id, init);
	}
	protected async sendGetMoreItems(
		request: PaginatedRequest<string>
	): Promise<PaginatedResponse<IEntry, string>> {
		return this.goalService.getEntriesPaginated(this.goalId, request);
	}
	protected getStartKey(lastItem?: IEntry): string | undefined {
		return lastItem?.dateOf;
	}

	async createEntry(params: UserEntryCreateParams): Promise<void> {
		if (this.shared) throw new Error('Cannot create entry in shared collection');

		const createParams = { ...params, goal: this.goalId };

		await this.create({
			createParams,
			optimistic: true,
			shouldAdd: (data) => {
				// Only add the entry to the collection if it is within the range of
				// entries that have already been loaded.
				if (!this.getLastExclusiveStartKey) return false;
				return (
					compareNullable(DateEx.compareDateOnlyStrings)(
						this.getStartKey(data),
						this.getLastExclusiveStartKey()
					) > 0
				);
			},
			sendCreate: async (createParams) => {
				return this.goalService.createEntry({
					...createParams,
					goalId: createParams.goal
				});
			}
		});
	}

	async deleteEntry(id: string): Promise<void> {
		return this.delete({
			id,
			optimistic: true,
			sendDelete: async () => {
				await this.goalService.deleteEntry(id);
			}
		});
	}
}
