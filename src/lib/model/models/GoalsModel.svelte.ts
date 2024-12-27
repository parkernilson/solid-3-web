import type { GoalService } from '$lib/services/GoalService.svelte';
import { indexBy } from '$lib/utils/arrays/index-list';
import type { GoalInfo } from '../domain/goals';
import type { AuthModel } from './AuthModel.svelte';

interface IndexedGoalInfos {
	[userId: string]: {
		[goalId: string]: GoalInfo
	}
}

export class GoalsModel {
	private authModel?: AuthModel
	private _goals = $state<IndexedGoalInfos | undefined>();
	private _myGoals = $derived(
		this.authModel?.user?.id ? 
			this._goals?.[this.authModel.user.id]
			: undefined
	)

	get goals() { 
		return this._myGoals
	}
	private setGoals(goals: IndexedGoalInfos) {
		this._goals = goals
	}

	constructor(authModel: AuthModel, private goalService: GoalService) {
		this.authModel = authModel
	}

	async loadGoals() {
		if (!this.authModel?.user) {
			throw new Error("Cannot load goals without an active user")
		}
		const goalInfos = await this.goalService.listGoalInfos(this.authModel.user.id)
		const indexedGoalInfos = indexBy(goalInfos, g => g.goal.id)
		this.setGoals({
			[this.authModel.user.id]: indexedGoalInfos
		})
	}
}
