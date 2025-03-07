export type ExecuteUpdateParams = {
	performUpdate: () => Promise<void>;
	applyOptimistic?: () => void;
	rollbackOptimistic?: () => void;
};

export abstract class UpdateRunner {
	private _updating = $state(false);
	public get updating(): boolean {
		return this._updating;
	}
	protected setUpdating(value: boolean) {
		this._updating = value;
	}

	protected initUpdate(operation: ExecuteUpdateParams) {
		this.setUpdating(true);
		if (operation.applyOptimistic) {
			operation.applyOptimistic();
		}
	}

	protected abstract doUpdate(operation: ExecuteUpdateParams): Promise<void>;
	executeUpdate(operation: ExecuteUpdateParams): Promise<void> {
		if (!!operation.applyOptimistic !== !!operation.rollbackOptimistic) {
			throw new Error('applyOptimistic and rollbackOptimistic must both be defined or undefined');
		}
		return this.doUpdate(operation);
	}

	protected applyRollback(operation: ExecuteUpdateParams) {
		if (operation.applyOptimistic) {
			if (!operation.rollbackOptimistic) {
				throw new Error('rollbackOptimistic must be defined if applyOptimistic is defined');
			}
			operation.rollbackOptimistic();
		}
	}

	protected finalizeUpdate() {
		this.setUpdating(false);
	}
}
