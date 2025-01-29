import type { GoalService } from '$lib/services/GoalService.svelte';
import type { IGoalInfo } from '../domain/goals';
import { DataModel } from './DataModel.svelte';

export class GoalModel extends DataModel<IGoalInfo> {
	constructor(private goalService: GoalService, private goalId: string, initialData?: IGoalInfo) {
		super(initialData);
	}

	async load(): Promise<void> {
		const goalInfo = await this.goalService.getGoalInfo(this.goalId);
		this.setData(goalInfo);
	}

	protected sendUpdate(data: IGoalInfo): Promise<IGoalInfo> {
		// TODO: implement me
		throw new Error('Method not implemented.');
	}
}
