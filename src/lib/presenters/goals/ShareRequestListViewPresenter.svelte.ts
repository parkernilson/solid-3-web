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

	private async acceptOrReject(status: "accept" | "reject") {
		await this.doErrorable({
			action: async () => {
				if (status === "accept") {
					await this.sharedGoalsModel.acceptSharedGoal(this.sharedGoalPreview.id);
				} else {
					await this.sharedGoalsModel.rejectSharedGoal(this.sharedGoalPreview.id);
				}
			}
		})
	}

	async accept() {
		await this.acceptOrReject("accept");
	}

	async reject() {
		await this.acceptOrReject("reject");
	}

	constructor(
		errorService: ErrorService,
		private sharedGoalsModel: SharedGoalsModel,
		private sharedGoalPreview: ISharedGoalPreview
	) {
		super(errorService);
	}
}
