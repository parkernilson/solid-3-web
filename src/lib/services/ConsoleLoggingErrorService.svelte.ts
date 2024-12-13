import type { ErrorService } from "./ErrorService.svelte";

export class ConsoleLoggingErrorService implements ErrorService {
    handleError(e: unknown) {
        console.error(e)
    }
}