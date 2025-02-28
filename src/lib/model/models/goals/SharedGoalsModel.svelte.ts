import type { ModelFactory } from '$lib/factories/models/ModelFactory.svelte';
import type { ShareStatus } from '$lib/model/domain/goals';
import type { UserProfile } from '$lib/model/domain/users';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { BaseModel } from '../base/BaseModel.svelte';
import type { SharedGoalCollectionModel } from './SharedGoalCollectionModel.svelte';
import type { SharedGoalPreviewCollectionModel } from './SharedGoalPreviewCollectionModel.svelte';

export class SharedGoalsModel extends BaseModel {
	private sharedGoalsCollectionModel: SharedGoalCollectionModel;
	private sharedGoalPreviewsCollectionModel: SharedGoalPreviewCollectionModel = $state()!;

	private _sharedGoalsWithMePending = $derived(
		this.sharedGoalPreviewsCollectionModel?.data ?
		this.sharedGoalPreviewsCollectionModel.data.filter((g) => g.shareStatus === 'pending')
		: undefined
	);

	public get sharedGoalsWithMe() {
		return this.sharedGoalsCollectionModel.data;
	}
	public get sharedGoalsWithMePending() {
		return this._sharedGoalsWithMePending;
	}

	constructor(
		modelFactory: ModelFactory,
		private user: UserProfile,
		private goalService: GoalService
	) {
		super();
		this.sharedGoalsCollectionModel = modelFactory.createSharedGoalCollectionModel(this.user);
		this.sharedGoalPreviewsCollectionModel = modelFactory.createSharedGoalPreviewCollectionModel(
			this.user
		);
	}

	protected async sendLoad(): Promise<void> {
        await Promise.all([
            this.sharedGoalsCollectionModel.load(),
            this.sharedGoalPreviewsCollectionModel.load()
        ])
    }

	// TODO: implement this method with built in model updates (??)
	private async setSharedGoalStatus(goalId: string, status: ShareStatus): Promise<void> {
		const prevStatus = this.sharedGoalPreviewsCollectionModel.markRequestStatus(goalId, status);
		try {
			switch (status) {
				case 'accepted':
					await this.goalService.acceptSharedGoal({ goalId });
					break;
				case 'rejected':
					await this.goalService.rejectSharedGoal({ goalId });
					break;
				case 'pending':
				default:
					throw new Error("Invalid status.");
			}
			await this.sharedGoalsCollectionModel.reload();
		} catch(e) {
			this.sharedGoalPreviewsCollectionModel.markRequestStatus(goalId, prevStatus);
			throw e;
		}
	}

	async acceptSharedGoal(goalId: string): Promise<void> {
		await this.setSharedGoalStatus(goalId, 'accepted');
	}

	async rejectSharedGoal(goalId: string): Promise<void> {
		await this.setSharedGoalStatus(goalId, 'rejected');
	}
}
