import type { IdType } from '$lib/model/domain/HasId';
import { DataModel, type DataModelInit } from './DataModel.svelte';
import type { SendUpdateFn, UpdateRunner, UpdateRunnerConstructor } from './update-runners';

export interface UpdateParams<T, OptimisticUpdateTParams> {
	optimisticParams?: OptimisticUpdateTParams;
	sendUpdate: SendUpdateFn<T>;
}

export abstract class UpdatableDataModel<
	T,
	OptimisticUpdateTParams,
	Id extends IdType = IdType
> extends DataModel<T, Id> {
	public get updating() {
		return this.updateRunner.updating;
	}

	private _updateRunner: UpdateRunner<T>;
	private get updateRunner() {
		return this._updateRunner;
	}

	constructor(
		updateRunnerConstructor: UpdateRunnerConstructor<T>,
		id: Id,
		init: DataModelInit<T> = {}
	) {
		super(id, init);
		this._updateRunner = updateRunnerConstructor(this);
	}

	protected abstract getOptimisticUpdateT(currentValue: T, params: OptimisticUpdateTParams): T;

	protected async update(params: UpdateParams<T, OptimisticUpdateTParams>): Promise<T> {
		if (!this.data) throw new Error('Data not loaded');

		const optimisticValue = params.optimisticParams
			? this.getOptimisticUpdateT(this.data, params.optimisticParams)
			: undefined;
		return this.updateRunner.executeUpdate({
			optimisticValue,
			sendUpdate: params.sendUpdate.bind(params)
		});
	}
}
