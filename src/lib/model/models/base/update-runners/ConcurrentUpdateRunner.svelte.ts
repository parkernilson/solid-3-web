import { UpdateRunner, type ExecuteUpdateParams } from './UpdateRunner.svelte';

/**
 * Runs asynchronous optimistic updates by immediately applying the optimistic update,
 * and running any send functions received in parallel.
 *
 * If a send function fails, the model applies the rollback (which should effectively
 * undo the optimistic update without affecting other updates. If this is not the case,
 * consider using the ConsecutiveUpdateRunner instead),
 * but other send functions are allowed to continue.
 *
 * This is useful if updates do not depend on each other, and we only want to keep the most recent
 * update.
 */
export class ConcurrentUpdateRunner extends UpdateRunner {
	protected async doUpdate(operation: ExecuteUpdateParams): Promise<void> {
		this.initUpdate(operation);

		try {
			await operation.performUpdate();
		} catch (e) {
			this.applyRollback(operation);
			throw e;
		} finally {
			this.finalizeUpdate();
		}
	}
}
