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

	async acceptShareRequest(goalId: string) {
        await this.doErrorable({
            action: async () => {
                await this.goalService.acceptSharedGoal({ goalId });
                this.goalsRoutePresenter.markShareRequestAsAccepted(goalId);
            }
        })
    }
}
