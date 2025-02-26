import { UpdateRunner, type ExecuteUpdateParams } from "./UpdateRunner.svelte";

/**
 * Runs asynchronous optimistic updates by immediately applying the optimistic value
 * and running any send functions received in parallel.
 *
 * If a send function fails, the model is rolled back to the most recent server-confirmed value,
 * but other send functions are allowed to continue.
 *
 * This is useful if updates do not depend on each other, and we only want to keep the most recent
 * value.
 */
export class ConcurrentUpdateRunner<T> extends UpdateRunner<T> {
	async executeUpdate(operation: ExecuteUpdateParams<T>): Promise<T> {
		this.initUpdate(operation.optimisticValue);

		try {
			const result = await this.performUpdateSendSequence(operation);
			this.setData(result);
			this.updateRollbackValue(result);
			return result;
		} catch (e) {
			this.performRollback();
			throw e;
		} finally {
			this.finalizeUpdate();
		}
	}
}