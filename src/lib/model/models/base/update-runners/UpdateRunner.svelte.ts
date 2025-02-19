import type { DataModel } from '../DataModel.svelte';

interface SendUpdateParams<T> {
	optimisticValue?: T;
}


export interface UpdateParams<T> {
	optimisticValue?: T;
	sendUpdate: (params: SendUpdateParams<T>) => Promise<T>;
}

export abstract class UpdateRunner<T> {
	private _rollbackValue: T | undefined = undefined;
	private get rollbackValue(): T | undefined {
		return this._rollbackValue;
	}
	protected setRollbackValue(value: T | undefined): void {
		this._rollbackValue = value;
	}
	protected updateRollbackValue(value: T | undefined): void {
		this._rollbackValue = value;
	}
	protected performRollback() {
		this.setData(this.rollbackValue);
	}

	private _updating = $state(false);
	public get updating(): boolean {
		return this._updating;
	}
	protected setUpdating(loading: boolean): void {
		this._updating = loading;
	}

	constructor(private model: DataModel<T>) {
		this.updateRollbackValue(model.data);
	}

	abstract executeUpdate(params: UpdateParams<T>): Promise<T>;

	protected setData(data: T | undefined, optimistic = false) {
		this.model.setData(data, { optimistic });
	}

	protected initUpdate(optimisticValue?: T) {
		this.setUpdating(true);
		if (optimisticValue) this.model.setData(optimisticValue, { optimistic: true });
	}

	protected async performUpdateSendSequence(operation: UpdateParams<T>): Promise<T> {
		return operation.sendUpdate({
			optimisticValue: operation.optimisticValue
		});
	}

	protected finalizeUpdate() {
		this.setUpdating(false);
	}
}
