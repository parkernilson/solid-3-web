import type { KeyFn } from '$lib/model/domain/KeyFn';
import type { IdType } from '../../domain/HasId';
import { BaseModel } from './BaseModel.svelte';
import type { DataModel, DataModelInit } from './DataModel.svelte';
import type { DataStructure } from './DataStructure.svelte';

export abstract class CollectionModel<
	T,
	DM extends DataModel<T> = DataModel<T>,
	DS extends DataStructure<DM> = DataStructure<DM>
> extends BaseModel {
	constructor(
		protected dataStructure: DS,
		protected key: KeyFn<T>,
		initialData?: T[]
	) {
		super();
		if (initialData) this.setItems(initialData);
	}

	protected abstract makeConstituentDataModel(
		data: T,
		init?: Omit<DataModelInit<T>, 'initialData'>
	): DM;

	private mapToModels(data: T[]): DM[] {
		return data.map((t) => this.makeConstituentDataModel(t));
	}

	public getModel(id: IdType): DM | undefined {
		return this.dataStructure.get(id);
	}
	public add(data: T) {
		this.dataStructure.add(this.makeConstituentDataModel(data));
	}
	public addModel(model: DM) {
		this.dataStructure.add(model);
	}
	public setItems(data: T[]) {
		this.dataStructure.setItems(this.mapToModels(data));
	}
	public setModels(models: DM[]) {
		this.dataStructure.setItems(models);
	}
	public addItems(data: T[]) {
		this.dataStructure.addItems(this.mapToModels(data));
	}
	public addModels(models: DM[]) {
		this.dataStructure.addItems(models);
	}
	public remove(id: IdType) {
		this.dataStructure.remove(id);
	}
	public update(id: IdType, data: T) {
		if (this.key(data) !== id) {
			throw new Error(
				`CollectionModel: update called with id ${id} but data has id ${this.key(data)}`
			);
		}
		this.dataStructure.update(id, this.makeConstituentDataModel(data));
	}
	public updateWithNewId(oldId: IdType, data: T) {
		this.dataStructure.update(oldId, this.makeConstituentDataModel(data));
	}
	public updateModel(id: IdType, model: DM) {
		this.dataStructure.update(id, model);
	}

	protected abstract loadData(): Promise<T[]>;
	protected async sendLoad(): Promise<void> {
		const data = await this.loadData();
		this.setItems(data);
	}
}
