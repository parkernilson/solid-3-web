import type { GoalService } from '$lib/services/GoalService.svelte';
import type { IGoalInfo } from '../../domain/goals';
import { DataModel } from '../base/DataModel.svelte';

export class GoalDataModel extends DataModel<IGoalInfo> {
	constructor(private goalService: GoalService, private goalId: string, initialData?: IGoalInfo) {
		super(goalId, initialData);
	}

	async load(): Promise<void> {
		const goalInfo = await this.goalService.getGoalInfo(this.goalId);
		this.setData(goalInfo);
	}

	protected sendUpdate(): Promise<IGoalInfo> {
		// TODO: implement me
		throw new Error('Method not implemented.');
	}
}
