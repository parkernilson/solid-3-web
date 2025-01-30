import type { ModelFactory } from '$lib/factories/models/ModelFactory.svelte';
import { type SharedGoalDto, type ShareStatus } from '$lib/model/domain/goals';
import type { UserProfile } from '$lib/model/domain/users';
import type { AuthModel } from '$lib/model/models/AuthModel.svelte';
import type { GoalCollectionModel } from '$lib/model/models/GoalCollectionModel.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { filterUndefined } from '$lib/utils/types';
import { LoadablePresenter } from '../LoadablePresenter.svelte';

export class GoalsRoutePresenter extends LoadablePresenter {
	private _sharedGoalsWithMe = $state<SharedGoalDto[]>();
	private _sharedGoalsWithMePending = $derived(
		this.sharedGoalsWithMe?.filter((g) => g.shareStatus === 'pending')
	);
	public goalCollectionModel: GoalCollectionModel;

	public get goals() {
		return this.goalCollectionModel.models
			? filterUndefined(this.goalCollectionModel.models?.map((m) => m.data))
			: undefined;
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
		private goalService: GoalService,
		modelFactory: ModelFactory
	) {
		super(errorService);
		if (!this.user)
			throw new Error('Tried to create goals route presenter without a signed in user');
		this.goalCollectionModel = modelFactory.createGoalCollectionModel(this.user.id);
	}

	protected async loadResource(): Promise<void> {
		if (!this.user) throw new Error('Tried to load goals route without a signed in user');
		await this.loadGoals();
		await this.loadSharedGoalsWithMe(this.user);
	}

	async loadGoals() {
		await this.goalCollectionModel.load();
	}

	async loadSharedGoalsWithMe(user: UserProfile) {
		this.sharedGoalsWithMe = await this.goalService.listSharedGoalsWithUser(user);
	}

	async markShareRequestStatus(goalId: string, status: ShareStatus) {
		const i = this.sharedGoalsWithMe?.findIndex((g) => g.goalId === goalId);
		if (i !== undefined && this.sharedGoalsWithMe?.[i]) {
			this.sharedGoalsWithMe[i].shareStatus = status;
		}
	}
}
