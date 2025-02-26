import { UpdateRunner, type ExecuteUpdateParams } from "./UpdateRunner.svelte";

/**
 * Runs asynchronous optimistic updates by immediately applying the optimistic value,
 * then running the send functions in the order received each only after the previous update has
 * successfully resolved.
 *
 * If any of the send functions fail, the model is rolled back to the most recent server-confirmed value,
 * and all subsequent operations are rejected.
 *
 * This is useful for classes where each update depends on the previous update being posted successfully first,
 * but we want to allow the UI to continue updating the model optimistically.
 */
export class ConsecutiveUpdateRunner<T> extends UpdateRunner<T> {
	private queue: QueuedUpdate<T>[] = [];

	private getQueuedUpdate(params: ExecuteUpdateParams<T>, promiseFns: PromiseFns<T>): QueuedUpdate<T> {
		return {
			optimisticValue: params.optimisticValue,
			performUpdateSendSequence: () => this.performUpdateSendSequence(params),
			...promiseFns
		};
	}

	private async processQueue(): Promise<void> {
		while (this.queue.length > 0) {
			const operation = this.queue[0];
			try {
				const result = await operation.performUpdateSendSequence();
				this.updateRollbackValue(result);
				this.setData(result);
				operation.resolve(result);
			} catch (e) {
				this.performRollback();
				let op: (typeof this.queue)[0] | undefined;
				while ((op = this.queue.pop())) {
					op.reject(e);
				}
			} finally {
				this.queue.shift();
				if (this.queue.length === 0) {
					this.finalizeUpdate();
				}
			}
		}
	}

	executeUpdate(operation: ExecuteUpdateParams<T>): Promise<T> {
		this.initUpdate(operation.optimisticValue);
		return new Promise<T>((resolve, reject) => {
			this.queue.push(this.getQueuedUpdate(operation, { resolve, reject }));
			if (this.queue.length === 1) {
				this.processQueue();
			}
		});
	}
}

export interface PromiseFns<T> {
	resolve: (t: T) => void;
	reject: (e: unknown) => void;
}

interface QueuedUpdate<T> extends PromiseFns<T> {
	optimisticValue?: T;
	performUpdateSendSequence: () => Promise<T>;
}