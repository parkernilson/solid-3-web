import { UpdateRunner, type ExecuteUpdateParams } from './UpdateRunner.svelte';

/**
 * Runs asynchronous optimistic updates by immediately applying the optimistic update,
 * then running the send functions in the order received each only after the previous update has
 * successfully resolved.
 *
 * If any of the send functions fail, all pending updates corresponding to an optimistic update
 * are rejected and rolled back starting from the most recently applied optimistic update going
 * back to the failing operation.
 *
 * This is useful for classes where each update depends on the previous update being posted successfully first,
 * but we want to allow the UI to continue updating the model optimistically.
 */
export class ConsecutiveUpdateRunner extends UpdateRunner {
	private queue: QueuedUpdate[] = [];

	private async processQueue(): Promise<void> {
		while (this.queue.length > 0) {
			const operation = this.queue[0];
			try {
				await operation.performUpdate();
				operation.resolve();
			} catch (e) {
				let op: (typeof this.queue)[0] | undefined;
				while ((op = this.queue.pop())) {
					this.applyRollback(op);
					op.reject(e);
				}
			} finally {
				this.queue.shift();
				this.finalizeUpdate();
			}
		}
	}

	protected doUpdate(operation: ExecuteUpdateParams): Promise<void> {
		this.initUpdate(operation);
		return new Promise((resolve, reject) => {
			this.queue.push(this.getQueuedUpdate(operation, { resolve, reject }));
			if (this.queue.length === 1) {
				this.processQueue();
			}
		});
	}

	private getQueuedUpdate(params: ExecuteUpdateParams, promiseFns: PromiseFns): QueuedUpdate {
		return {
			...params,
			...promiseFns
		};
	}
}

export interface PromiseFns {
	resolve: () => void;
	reject: (e: unknown) => void;
}

type QueuedUpdate = ExecuteUpdateParams & PromiseFns;
