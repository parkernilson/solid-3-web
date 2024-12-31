import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { ErrorHandler } from '../../utils/ErrorHandler';
import type { GoalsRoutePresenter } from './GoalsRoutePresenter.svelte';

export class ShareRequestsPagePresenter extends ErrorHandler {
	get sharedGoalsWithMePending() {
		return this.goalsRoutePresenter.sharedGoalsWithMePending;
	}

	constructor(
		errorService: ErrorService,
		private goalService: GoalService,
		private goalsRoutePresenter: GoalsRoutePresenter
	) {
		super(errorService);
	}

	private async doShareRequestAcceptOrReject(goalId: string, accept: boolean) {
		const prevStatus = this.goalsRoutePresenter.sharedGoalsWithMe?.find(
			(g) => g.goalId === goalId
		)?.shareStatus;

		await this.doErrorable({
			action: async () => {
				if (accept) {
					await this.goalService.acceptSharedGoal({ goalId });
					this.goalsRoutePresenter.markShareRequestStatus(goalId, 'accepted');
				} else {
					await this.goalService.rejectSharedGoal({ goalId });
					this.goalsRoutePresenter.markShareRequestStatus(goalId, 'rejected');
				}
			},
			onError: async () => {
				if (prevStatus) {
					this.goalsRoutePresenter.markShareRequestStatus(goalId, prevStatus);
				}
			}
		});
	}

	async acceptShareRequest(goalId: string) {
		await this.doShareRequestAcceptOrReject(goalId, true);
	}

	async rejectShareRequest(goalId: string) {
		await this.doShareRequestAcceptOrReject(goalId, false);
	}

}
