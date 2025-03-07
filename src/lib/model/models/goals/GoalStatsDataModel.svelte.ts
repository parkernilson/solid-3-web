import type { IGoalStats } from '$lib/model/domain/goals/GoalStats';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { DataModel, type DataModelInit } from '../base/DataModel.svelte';

export class GoalStatsDataModel extends DataModel<IGoalStats> {
	constructor(
		private goalService: GoalService,
		private goalId: string,
		init: DataModelInit<IGoalStats>
	) {
		super(goalId, init);
	}

	protected loadData(): Promise<IGoalStats> {
		return this.goalService.getGoalStats(this.goalId);
	}
}
