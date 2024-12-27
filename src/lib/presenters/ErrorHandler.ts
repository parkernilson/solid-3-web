import type { ErrorService } from '$lib/services/ErrorService.svelte';

export abstract class ErrorHandler {
	protected errorService: ErrorService;

	constructor(errorService: ErrorService) {
		this.errorService = errorService;
	}

	async doErrorable({
		action,
		onError,
		onFinally
	}: {
		action: () => void | Promise<void>;
		onError?: (e: unknown) => void | Promise<void>;
		onFinally?: () => void | Promise<void>;
	}): Promise<void> {
		try {
			await action();
		} catch (e) {
			this.errorService.handleError(e);
			if (onError) {
				await this.doErrorable({ action: async () => await onError(e) });
			}
		} finally {
			if (onFinally) {
				await this.doErrorable({ action: onFinally });
			}
		}
	}
}
