import type {
	EntryUpdateParams,
	IGoal,
	IGoalStats,
	ISharedGoal,
	UserEntryCreateParams
} from '$lib/model/domain/goals';
import { BaseModel } from '../base/BaseModel.svelte';
import type { EntryCollectionModel } from './EntryCollectionModel.svelte';
import { GoalDataModel } from './GoalDataModel.svelte';
import type { GoalStatsDataModel } from './GoalStatsDataModel.svelte';
import { SharedGoalDataModel } from './SharedGoalDataModel.svelte';

export class GoalModel extends BaseModel {
	public get goalId(): string {
		return this.goalDataModel.id as string;
	}

	public get goalData(): IGoal | ISharedGoal | undefined {
		return this.goalDataModel.data;
	}

	public get goalStats(): IGoalStats | undefined {
		return this.goalStatsModel.data;
	}

	public get isSharedGoal() {
		return this.goalDataModel instanceof SharedGoalDataModel;
	}

	constructor(
		private goalDataModel: GoalDataModel | SharedGoalDataModel,
		private goalStatsModel: GoalStatsDataModel,
		public entryCollectionModel: EntryCollectionModel
	) {
		super();
	}

	// TODO: implement the abstract update runner that I talked about for
	// "Per Entry Streaks", because we should run these updates using that here
	// to group the stat updates with the entry updates / create / delete

	async createEntry(params: UserEntryCreateParams): Promise<void> {
		// TODO: refresh goal stats
		await this.entryCollectionModel.createEntry(params);
	}

	async updateEntry(id: string, params: EntryUpdateParams): Promise<void> {
		// TODO: refresh goal stats
		const model = this.entryCollectionModel.getModel(id);
		if (!model) throw new Error(`Entry model not found for id: ${id}`);
		await model.updateEntry(params);
	}

	async sendLoad(): Promise<void> {
		await Promise.all([this.goalDataModel.load(), this.goalStatsModel.load()]);
	}
}
