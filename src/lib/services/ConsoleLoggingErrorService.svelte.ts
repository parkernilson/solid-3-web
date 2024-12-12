import type { ErrorService } from "./ErrorService.svelte";

export class ConsoleLoggingErrorService implements ErrorService {
    reportError(e: unknown) {
        console.error(e)
    }
}