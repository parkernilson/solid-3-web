import type { ErrorService } from "$lib/services/ErrorService.svelte";
import type { GoalService } from "$lib/services/GoalService.svelte";
import { LoadablePresenter } from "../LoadablePresenter.svelte";

export abstract class GoalServicePresenter extends LoadablePresenter {
    constructor(errorService: ErrorService, protected goalService: GoalService) {
        super(errorService);
    }
}