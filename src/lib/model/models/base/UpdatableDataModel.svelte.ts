import type { IdType } from '$lib/model/domain/HasId';
import { DataModel, type DataModelInit } from './DataModel.svelte';
import type { UpdateParams, UpdateRunner, UpdateRunnerConstructor } from './update-runners';

export abstract class UpdatableDataModel<T, Id extends IdType = IdType> extends DataModel<T, Id> {
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

	protected async update(params: UpdateParams<T>): Promise<T> {
		return this.updateRunner.executeUpdate(params);
	}
}
