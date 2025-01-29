import type { GoalService } from '$lib/services/GoalService.svelte';
import type { GoalInfo } from '../domain/goals';

export class GoalModel {
	private _goal = $state<GoalInfo>();
	get goal() {
		return this._goal;
	}
	private set goal(g) {
		this._goal = g;
	}
	constructor(
		private goalId: string,
		private goalService: GoalService
	) {}
	async loadGoal() {
		this.goal = await this.goalService.getGoalInfo(this.goalId);
	}
}
