import { GoalInfo, type IGoalInfo, type ISharedGoal } from '$lib/model/domain/goals';
import type { AuthModel } from '$lib/model/models/auth/AuthModel.svelte';
import type { GoalCollectionModel } from '$lib/model/models/goals/GoalCollectionModel.svelte';
import type { SharedGoalsModel } from '$lib/model/models/goals/SharedGoalsModel.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { combineComparators } from '$lib/utils/compare';
import { ErrorHandler } from '../../utils/ErrorHandler';

enum DisplayGoals {
	All,
	Shared,
	Self
}

export class GoalsPagePresenter extends ErrorHandler {
	private display = $state<DisplayGoals>(DisplayGoals.All);
	public displayedGoals: (IGoalInfo | ISharedGoal)[] | undefined = $derived.by(() => {
		if (!this.goals || !this.sharedGoalsWithMe) {
			return undefined;
		}
		switch (this.display) {
			case DisplayGoals.Shared:
				return this.sortGoals(this.sharedGoalsWithMe);
			case DisplayGoals.Self:
				return this.sortGoals(this.goals);
			case DisplayGoals.All:
			default:
				return this.sortGoals([...this.goals, ...this.sharedGoalsWithMe]);
		}
	});

	public get goals() {
		return this.goalsCollectionModel.data;
	}
	public get sharedGoalsWithMe() {
		return this.sharedGoalsModel.sharedGoalsWithMe;
	}
	public get sharedGoalsWithMePending() {
		return this.sharedGoalsModel.sharedGoalsWithMePending;
	}
	public get user() {
		return this.authModel.user;
	}

	private compareGoals = combineComparators(
		GoalInfo.compareStartDateJson,
		GoalInfo.compareActivityJson
	)

	private sortGoals = (goals: IGoalInfo[]) => {
		return goals.sort(this.compareGoals);
	}

	constructor(
		private authModel: AuthModel,
		errorService: ErrorService,
		private goalsCollectionModel: GoalCollectionModel,
		private sharedGoalsModel: SharedGoalsModel,
	) {
		super(errorService);
	}
}
