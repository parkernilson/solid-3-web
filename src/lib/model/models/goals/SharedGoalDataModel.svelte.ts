import type { ISharedGoalInfo } from '$lib/model/domain/goals/SharedGoalInfo';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { DataModel } from '../base/DataModel.svelte';

export class SharedGoalDataModel extends DataModel<ISharedGoalInfo> {
	constructor(
		private goalService: GoalService,
		private goalId: string,
		initialData?: ISharedGoalInfo
	) {
		super(goalId, initialData);
	}

	protected sendUpdate(): Promise<ISharedGoalInfo> {
		throw new Error('Method not implemented.');
	}
	async load(): Promise<void> {
		const sharedGoal = await this.goalService.getSharedGoalInfo(this.goalId)
		this.setData(sharedGoal);
	}
}
