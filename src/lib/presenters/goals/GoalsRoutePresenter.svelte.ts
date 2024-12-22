import type { GoalInfo } from '$lib/model/domain/goals';
import { ShareRecord } from '$lib/model/domain/goals/ShareRecord';
import type { UserProfile } from '$lib/model/domain/users';
import type { AuthService } from '$lib/services/AuthService.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { LoadablePresenter } from '../LoadablePresenter.svelte';

export class GoalsRoutePresenter extends LoadablePresenter {
	private _goals = $state<GoalInfo[]>();
	private _sharedGoalsByMe = $state<ShareRecord[]>();
	private _sharedGoalsWithMe = $state<ShareRecord[]>();
	private _sharedGoalsWithMePending = $derived(
		this.sharedGoalsWithMe?.filter((g) => g.status === 'pending')
	);

	public get goals() {
		return this._goals;
	}
	private set goals(g) {
		this._goals = g;
	}
	public get sharedGoalsByMe() {
		return this._sharedGoalsByMe;
	}
	private set sharedGoalsByMe(s) {
		this._sharedGoalsByMe = s;
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
		return this.authService.user;
	}

	constructor(
		private authService: AuthService,
		errorService: ErrorService,
		private goalService: GoalService
	) {
		super(errorService);
	}

	protected async loadResource(): Promise<void> {
		if (!this.user) throw new Error('Tried to load goals route without a signed in user');
		await this.loadGoals(this.user);
		await this.loadShareRecords(this.user);
	}

	async loadGoals(user: UserProfile) {
		this.goals = await this.goalService.listGoalInfos(user.id);
	}

	async loadShareRecords(user: UserProfile) {
		this.sharedGoalsWithMe = await this.goalService.listShareRecords(user.id);
	}

	async markShareRequestAsAccepted(goalId: string) {
		this.sharedGoalsWithMe = this.sharedGoalsWithMe?.map((g) =>
			g.goalId === goalId
				? ShareRecord.fromJson({
						...g.toJson(),
						status: 'accepted'
					})
				: g
		);
	}
}
