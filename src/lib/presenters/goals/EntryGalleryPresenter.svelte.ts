import { ErrorService } from "$lib/services/ErrorService.svelte";
import { GoalService } from "$lib/services/GoalService.svelte";

export class EntryGalleryPresenter {
	private goalService: GoalService;
    private errorService: ErrorService;

	constructor(goalService: GoalService, errorService: ErrorService) {
		this.goalService = goalService;
        this.errorService = errorService;
	}

}