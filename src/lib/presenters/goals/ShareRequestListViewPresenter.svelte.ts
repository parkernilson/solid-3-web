import type { ISharedGoalPreview } from '$lib/model/domain/goals';
import type { SharedGoalsModel } from '$lib/model/models/goals/SharedGoalsModel.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { ErrorHandler } from '$lib/utils/ErrorHandler';

export class ShareRequestListViewPresenter extends ErrorHandler {
	get goalTitle() {
		return this.sharedGoalPreview.goalTitle;
	}

	get goalOwnerEmail() {
		return this.sharedGoalPreview.goalOwnerEmail;
	}

	constructor(
		errorService: ErrorService,
		private sharedGoalsModel: SharedGoalsModel,
		private sharedGoalPreview: ISharedGoalPreview
	) {
		super(errorService);
	}
}
