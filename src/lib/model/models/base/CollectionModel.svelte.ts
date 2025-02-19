import type { IdType } from '../../domain/Id';
import { BaseModel } from './BaseModel.svelte';
import type { DataModel } from './DataModel.svelte';
import type { DataStructure } from './DataStructure.svelte';

export abstract class CollectionModel<
	T,
	DM extends DataModel<T> = DataModel<T>,
	DS extends DataStructure<DM> = DataStructure<DM>
> extends BaseModel {
	constructor(
		protected dataStructure: DS,
		initialData?: T[]
	) {
		super();
		if (initialData)
			this.dataStructure.setItems(initialData.map(this.makeConstituentDataModel.bind(this)));
	}

	protected abstract makeConstituentDataModel(data: T): DM;
	protected abstract sendCreate(data: T): Promise<T>;
	protected abstract sendDelete(id: IdType): Promise<void>;

	protected getModel(id: IdType): DM | undefined {
		return this.dataStructure.get(id);
	}
	protected add(data: T) {
		this.dataStructure.add(this.makeConstituentDataModel(data));
	}
	protected addModel(model: DM) {
		this.dataStructure.add(model);
	}
	protected setItems(data: T[]) {
		this.dataStructure.setItems(data.map(this.makeConstituentDataModel.bind(this)));
	}
	protected setModels(models: DM[]) {
		this.dataStructure.setItems(models);
	}
	protected addItems(data: T[]) {
		this.dataStructure.addItems(data.map(this.makeConstituentDataModel.bind(this)));
	}
	protected addModels(models: DM[]) {
		this.dataStructure.addItems(models);
	}
	protected remove(id: IdType) {
		this.dataStructure.remove(id);
	}
	protected update(id: IdType, data: T) {
		this.dataStructure.update(id, this.makeConstituentDataModel(data));
	}
	protected updateModel(id: IdType, model: DM) {
		this.dataStructure.update(id, model);
	}

	protected abstract loadData(): Promise<T[]>;
	protected async sendLoad(): Promise<void> {
		const data = await this.loadData();
		this.setItems(data);
	}

	protected async optimisticCreate(data: T): Promise<void> {
		const model = this.makeConstituentDataModel(data);
		const id = this.dataStructure.key(model);
		this.add(data);
		try {
			const result = await this.sendCreate(data);
			this.update(id, result);
		} catch (e) {
			this.remove(id);
			throw e;
		}
	}

	protected async optimisticDelete(id: IdType): Promise<void> {
		const originalItem = this.getModel(id);
		this.remove(id);
		try {
			await this.sendDelete(id);
		} catch (e) {
			if (originalItem) this.addModel(originalItem);
			throw e;
		}
	}
}
