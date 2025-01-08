import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { ErrorHandler } from '$lib/utils/ErrorHandler';
import type { VisualViewportInspector } from '../window/VisualViewportInspector.svelte';
import type { GoalsRoutePresenter } from './GoalsRoutePresenter.svelte';

export class CreateGoalModalPresenter extends ErrorHandler {
    get viewport() {
        return this.VisualViewportInspector.viewport;
    }
	constructor(
		errorService: ErrorService,
		private goalsRoutePresenter: GoalsRoutePresenter,
		private VisualViewportInspector: VisualViewportInspector
	) {
		super(errorService);
	}
}
