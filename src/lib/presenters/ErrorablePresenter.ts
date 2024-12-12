import type { ErrorService } from "$lib/services/ErrorService.svelte";

export abstract class ErrorablePresenter {
    protected errorService: ErrorService;

    constructor(errorService: ErrorService) {
        this.errorService = errorService;
    }
}