import type { GoalInfo, SharedGoal } from '$lib/model/domain/goals';
import type { UserProfile } from '$lib/model/domain/users';
import type { AuthModel } from '$lib/model/models/AuthModel.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { LoadablePresenter } from '../LoadablePresenter.svelte';

export class GoalsRoutePresenter extends LoadablePresenter {
	private _goals = $state<GoalInfo[]>();
	private _sharedGoalsWithMe = $state<SharedGoal[]>();
	private _sharedGoalsWithMePending = $derived(
		this.sharedGoalsWithMe?.filter((g) => g.shareStatus === 'pending')
	);

	public get goals() {
		return this._goals;
	}
	private set goals(g) {
		this._goals = g;
	}
	public get sharedGoalsWithMe() {
		return this._sharedGoalsWithMe;
	}
	private set sharedGoalsWithMe(s) {
		this._sharedGoalsWithMe = s;
	}
	public get sharedGoalsWithMePending() {
		return this._sharedGoalsWithMePending;
	}
	private get user() {
		return this.authModel.user;
	}

	constructor(
		private authModel: AuthModel,
		errorService: ErrorService,
		private goalService: GoalService
	) {
		super(errorService);
	}

	protected async loadResource(): Promise<void> {
		if (!this.user) throw new Error('Tried to load goals route without a signed in user');
		await this.loadGoals(this.user);
		await this.loadSharedGoalsWithMe(this.user);
	}

	async loadGoals(user: UserProfile) {
		this.goals = await this.goalService.listGoalInfos(user.id);
	}

	async loadSharedGoalsWithMe(user: UserProfile) {
		this.sharedGoalsWithMe = await this.goalService.listSharedGoalsWithUser(user);
	}

	async markShareRequestAsAccepted(goalId: string) {
		// TODO: implement this
		// const i = this.sharedGoalsWithMe?.findIndex((g) => g.goalId === goalId);
		// if (i && this.sharedGoalsWithMe?.[i]) {
		// 	this.sharedGoalsWithMe[i] = ShareRecord.fromJson({
		// 		...this.sharedGoalsWithMe[i].toJson(),
		// 		status: 'accepted' 
		// 	});
		// }
	}
}
