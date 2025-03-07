import type { IdType } from '$lib/model/domain/HasId';
import { DataModel, type DataModelInit } from './DataModel.svelte';
import type { UpdateRunner } from './update-runners';

export interface UpdateParams<T, OptimisticUpdateTParams> {
	optimisticParams?: OptimisticUpdateTParams;
	sendUpdate: SendUpdateFn<T>;
}

interface SendUpdateFn<T> {
	(params: { optimisticValue?: T }): Promise<T>;
}

export abstract class UpdatableDataModel<T, OptimisticUpdateTParams> extends DataModel<T> {
	public get updating() {
		return this.updateRunner.updating;
	}

	private rollbackValue: T | undefined = undefined;

	constructor(
		private updateRunner: UpdateRunner,
		id: IdType,
		init: DataModelInit<T> = {}
	) {
		super(id, init);
		this.rollbackValue = this.data;
	}

	protected abstract getOptimisticUpdateT(currentValue: T, params: OptimisticUpdateTParams): T;

	protected async update(params: UpdateParams<T, OptimisticUpdateTParams>): Promise<T> {
		if (!this.loaded || !this.data) throw new Error('Data not loaded');

		const optimisticValue = params.optimisticParams
			? this.getOptimisticUpdateT(this.data, params.optimisticParams)
			: undefined;

		const applyOptimistic = optimisticValue
			? () => this.setData(optimisticValue, { optimistic: true })
			: undefined;

		const rollbackOptimistic = applyOptimistic ? () => this.setData(this.rollbackValue) : undefined;

		let result: T | undefined = undefined;

		await this.updateRunner.executeUpdate({
			applyOptimistic: applyOptimistic,
			performUpdate: async () => {
				result = await params.sendUpdate({ optimisticValue });
				this.setData(result);
				this.rollbackValue = result;
			},
			rollbackOptimistic: rollbackOptimistic
		});

		if (!result) throw new Error('Update failed to set a result');
		return result;
	}
}
