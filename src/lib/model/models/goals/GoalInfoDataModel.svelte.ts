import type { GoalService } from '$lib/services/GoalService.svelte';
import type { IGoalInfo } from '../../domain/goals';
import { DataModel } from '../base/DataModel.svelte';

export class GoalInfoDataModel extends DataModel<IGoalInfo> {
	constructor(private goalService: GoalService, private goalId: string, initialData?: IGoalInfo) {
		super(goalId, { initialData });
	}

	loadData(): Promise<IGoalInfo> {
		return this.goalService.getGoalInfo(this.goalId);
	}
}
