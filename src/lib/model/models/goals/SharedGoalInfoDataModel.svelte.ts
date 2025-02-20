import type { ISharedGoalInfo } from '$lib/model/domain/goals/SharedGoalInfo';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { DataModel } from '../base/DataModel.svelte';

export class SharedGoalInfoDataModel extends DataModel<ISharedGoalInfo> {
	constructor(
		private goalService: GoalService,
		private goalId: string,
		initialData?: ISharedGoalInfo
	) {
		super(goalId, { initialData });
	}

	protected loadData(): Promise<ISharedGoalInfo> {
		return this.goalService.getSharedGoalInfo(this.goalId);
	}
}
