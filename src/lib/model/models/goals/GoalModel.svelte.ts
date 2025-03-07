import type {
	EntryUpdateParams,
	IGoal,
	IGoalStats,
	ISharedGoal,
	UserEntryCreateParams
} from '$lib/model/domain/goals';
import { UpdatableModel } from '../base/UpdatableModel.svelte';
import type { ConsecutiveUpdateRunner } from '../base/update-runners';
import type { EntryCollectionModel } from './EntryCollectionModel.svelte';
import { GoalDataModel } from './GoalDataModel.svelte';
import type { GoalStatsDataModel } from './GoalStatsDataModel.svelte';
import { SharedGoalDataModel } from './SharedGoalDataModel.svelte';

// TODO: Implement orchestrated updates using the UpdatableModel update method

export class GoalModel extends UpdatableModel {
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
		updateRunner: ConsecutiveUpdateRunner,
		private goalDataModel: GoalDataModel | SharedGoalDataModel,
		private goalStatsModel: GoalStatsDataModel,
		public entryCollectionModel: EntryCollectionModel
	) {
		super(updateRunner);
	}

	async createEntry(params: UserEntryCreateParams): Promise<void> {
		await this.entryCollectionModel.createEntry(params);
		await this.goalStatsModel.reload();
	}

	async updateEntry(id: string, params: EntryUpdateParams): Promise<void> {
		const model = this.entryCollectionModel.getModel(id);
		if (!model) throw new Error(`Entry model not found for id: ${id}`);
		await model.updateEntry(params);
		await this.goalStatsModel.reload();
	}

	async sendLoad(): Promise<void> {
		await Promise.all([this.goalDataModel.load(), this.goalStatsModel.load()]);
	}
}
