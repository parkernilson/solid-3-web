import type { IGoal, IGoalStats, ISharedGoal } from '$lib/model/domain/goals';
import { BaseModel } from '../base/BaseModel.svelte';
import type { EntryCollectionModel } from './EntryCollectionModel.svelte';
import { GoalDataModel } from './GoalDataModel.svelte';
import type { GoalStatsDataModel } from './GoalStatsDataModel.svelte';
import { SharedGoalDataModel } from './SharedGoalDataModel.svelte';

export class GoalModel extends BaseModel {

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
        public entryCollectionModel: EntryCollectionModel,
	) {
		super();
	}

	async sendLoad(): Promise<void> {
		await Promise.all([this.goalDataModel.load(), this.goalStatsModel.load()]);
	}
}
