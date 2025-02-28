import type { KeyFn } from '$lib/model/domain/KeyFn';
import type { IdType } from '../../domain/HasId';
import { BaseModel } from './BaseModel.svelte';
import type { CreateDeleteRunner, CreateDeleteRunnerConstructor, ExecuteCreateParams, ExecuteDeleteParams } from './create-delete-runners';
import type { DataModel, DataModelInit } from './DataModel.svelte';
import type { DataStructure } from './data-structures';

export abstract class CollectionModel<
	T,
	CreateTParams,
	DM extends DataModel<T>
> extends BaseModel {
	
	private cdRunner: CreateDeleteRunner<T, CreateTParams, DM> | undefined;

	public get creating() {
		return this.cdRunner?.creating ?? false;
	}

	public get deleting() {
		return this.cdRunner?.deleting ?? false;
	}

	constructor(
		private dataStructure: DataStructure<DM>,
		protected key: KeyFn<T>,
		initialData?: T[],
		cdRunnerConstructor?: CreateDeleteRunnerConstructor<T, CreateTParams, DM>
	) {
		super();
		if (initialData) this.setItems(initialData);
		if (cdRunnerConstructor) this.cdRunner = cdRunnerConstructor(this, key);
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
	public add(data: T, optimistic = false) {
		this.dataStructure.add(this.makeConstituentDataModel(data, { optimistic }));
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
	public update(id: IdType, data: T, optimistic = false) {
		if (this.key(data) !== id) {
			throw new Error(
				`CollectionModel: update called with id ${id} but data has id ${this.key(data)}`
			);
		}
		this.dataStructure.update(id, this.makeConstituentDataModel(data, { optimistic }));
	}
	public updateWithNewId(oldId: IdType, data: T, optimistic = false) {
		this.dataStructure.update(oldId, this.makeConstituentDataModel(data, { optimistic }));
	}
	public updateModel(id: IdType, model: DM) {
		this.dataStructure.update(id, model);
	}

	protected abstract loadData(): Promise<T[]>;
	protected async sendLoad(): Promise<void> {
		const data = await this.loadData();
		this.setItems(data);
	}

	protected async create(params: ExecuteCreateParams<T, CreateTParams>): Promise<void> {
		if (!this.cdRunner) {
			throw new Error('CollectionModel: create not supported without createDeleteRunner');
		}
		return this.cdRunner.create(params);
	}

	protected async delete(params: ExecuteDeleteParams): Promise<void> {
		if (!this.cdRunner) {
			throw new Error('CollectionModel: delete not supported without createDeleteRunner');
		}
		return this.cdRunner.delete(params);
	}
}
