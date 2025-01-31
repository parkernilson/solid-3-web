import type { ModelFactory } from '$lib/factories/models/ModelFactory.svelte';
import type { UserProfile } from '$lib/model/domain/users';
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
		private user: UserProfile
	) {
		super();
		this.sharedGoalsCollectionModel = modelFactory.createSharedGoalCollectionModel(this.user);
		this.sharedGoalPreviewsCollectionModel = modelFactory.createSharedGoalPreviewCollectionModel(
			this.user
		);
	}

	async load(): Promise<void> {
        await Promise.all([
            this.sharedGoalsCollectionModel.load(),
            this.sharedGoalPreviewsCollectionModel.load()
        ])
    }
}
