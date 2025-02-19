import type { IdType } from '../../domain/Id';
import { BaseModel } from './BaseModel.svelte';

export interface DataModelInit<T> {
    optimistic?: boolean;
    initialData?: T;
}

interface SetDataOptions {
	optimistic?: boolean;
}

export abstract class DataModel<T, Id extends IdType = IdType> extends BaseModel {
	public data = $state<T>();
	/**
	 * True if the current data is an optimistic representation of the expected result of some
	 * transformation that is not yet completed.
	 * For example, this object may have been created or updated, but the server has not
	 * yet confirmed the change.
	 */
	public optimistic = $state<boolean>(false);

	constructor(
		public id: Id,
		{ initialData, optimistic = false }: DataModelInit<T> = {}
	) {
		super();
		if (initialData) this.setData(initialData);
		this.optimistic = optimistic;
	}

	public setData(data?: T, { optimistic = false }: SetDataOptions = {}): void {
		this.data = data;
		this.optimistic = optimistic;
	}

	abstract loadData(): Promise<T>;
	async sendLoad(): Promise<void> {
		const data = await this.loadData();
		this.setData(data);
	}
}
