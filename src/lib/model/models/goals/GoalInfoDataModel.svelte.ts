import type { GoalService } from '$lib/services/GoalService.svelte';
import type { IGoalInfo } from '../../domain/goals';
import { DataModel, type DataModelInit } from '../base/DataModel.svelte';

export class GoalInfoDataModel extends DataModel<IGoalInfo> {
	constructor(private goalService: GoalService, private goalId: string, init: DataModelInit<IGoalInfo>) {
		super(goalId, init);
	}

	loadData(): Promise<IGoalInfo> {
		return this.goalService.getGoalInfo(this.goalId);
	}
}
