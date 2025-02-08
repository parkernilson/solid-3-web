import type { SharedGoalsModel } from '$lib/model/models/goals/SharedGoalsModel.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { ErrorHandler } from '../../utils/ErrorHandler';

export class ShareRequestsPagePresenter extends ErrorHandler {
	get sharedGoalsWithMePending() {
		return this.sharedGoalsModel.sharedGoalsWithMePending;
	}

	constructor(
		errorService: ErrorService,
		private sharedGoalsModel: SharedGoalsModel,
	) {
		super(errorService);
	}

	// private async doShareRequestAcceptOrReject(goalId: string, accept: boolean) {
	// 	const prevStatus = this.goalsRoutePresenter.sharedGoalsWithMe?.find(
	// 		(g) => g.goalId === goalId
	// 	)?.shareStatus;

	// 	await this.doErrorable({
	// 		action: async () => {
	// 			if (accept) {
	// 				await this.goalService.acceptSharedGoal({ goalId });
	// 				this.goalsRoutePresenter.markShareRequestStatus(goalId, 'accepted');
	// 			} else {
	// 				await this.goalService.rejectSharedGoal({ goalId });
	// 				this.goalsRoutePresenter.markShareRequestStatus(goalId, 'rejected');
	// 			}
	// 		},
	// 		onError: async () => {
	// 			if (prevStatus) {
	// 				this.goalsRoutePresenter.markShareRequestStatus(goalId, prevStatus);
	// 			}
	// 		}
	// 	});
	// }

	// async acceptShareRequest(goalId: string) {
	// 	await this.doShareRequestAcceptOrReject(goalId, true);
	// }

	// async rejectShareRequest(goalId: string) {
	// 	await this.doShareRequestAcceptOrReject(goalId, false);
	// }

}
