import { compareNullable } from '$lib/utils/compare';
import type { CompareFn } from '$lib/utils/types';
import type { IdType } from '../../domain/HasId';
import { BaseModel } from './BaseModel.svelte';

export interface DataModelInit<T> {
	optimistic?: boolean;
	initialData?: T;
}

interface SetDataOptions {
	optimistic?: boolean;
}

export abstract class DataModel<T> extends BaseModel {
	private _data = $state<T>();
	public get data(): T | undefined {
		return this._data;
	}
	private set data(value: T) {
		this._data = value;
	}

	/**
	 * True if the current data is an optimistic representation of the expected result of some
	 * transformation that is not yet completed.
	 * For example, this object may have been created or updated, but the server has not
	 * yet confirmed the change.
	 */
	public optimistic = $state<boolean>(false);

	constructor(
		public id: IdType,
		{ initialData, optimistic = false }: DataModelInit<T>
	) {
		super();
		if (initialData) this.setData(initialData);
		this.optimistic = optimistic;
	}

	public setData(data: T, { optimistic = false }: SetDataOptions = {}): void {
		this.data = data;
		this.optimistic = optimistic;
	}

	protected abstract loadData(): Promise<T>;
	protected async sendLoad(): Promise<void> {
		const data = await this.loadData();
		this.setData(data);
	}

	/**
	 * Compare two data models by their data values.
	 * @param compare The comparison function to use for the data values.
	 * @param nullLt True if nullish data values should be considered less than non-nullish values. Otherwise they are considered greater than.
	 * @returns
	 */
	static compareData<T>(compare: CompareFn<T>, nullLt?: boolean): CompareFn<DataModel<T>> {
		return (a: DataModel<T>, b: DataModel<T>) => compareNullable(compare, nullLt)(a.data, b.data);
	}
}
