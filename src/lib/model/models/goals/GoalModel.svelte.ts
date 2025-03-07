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

	// TODO: use the update method on UpdatableModel to run these updates

	async createEntry(params: UserEntryCreateParams): Promise<void> {
		// TODO: refresh goal stats
		await this.entryCollectionModel.createEntry(params);
		await this.goalStatsModel.reload();
	}

	async updateEntry(id: string, params: EntryUpdateParams): Promise<void> {
		// TODO: refresh goal stats
		const model = this.entryCollectionModel.getModel(id);
		if (!model) throw new Error(`Entry model not found for id: ${id}`);
		await model.updateEntry(params);
		await this.goalStatsModel.reload();
	}

	async sendLoad(): Promise<void> {
		await Promise.all([this.goalDataModel.load(), this.goalStatsModel.load()]);
	}
}
