import type { Id, IdType } from '../../domain/Id';
import { CollectionModel } from './CollectionModel.svelte';
import type { DataModel } from './DataModel.svelte';

export abstract class ListCollectionModel<T extends Id> extends CollectionModel<T> {
	public models = $state<DataModel<T>[]>();

	constructor(initialData?: T[]) {
		super(initialData);
	}

	protected get(id: IdType): DataModel<T> | undefined {
		return this.models?.find((model) => model.data && model.data.id === id);
	}
	protected add(data: T): void {
		if (!this.models) this.models = [];
		const i = this.models.findIndex((m) => m.data && m.data.id === data.id);
		const newGoalModel = this.makeConstituentDataModel(data);
		if (!i || i === -1) {
			this.models.push(newGoalModel);
		} else {
			this.models.splice(i, 1, newGoalModel);
		}
	}
	protected setItems(data: T[]): void {
		this.models = data.map(this.makeConstituentDataModel.bind(this));
	}
	protected remove(id: IdType): void {
		if (!this.models) throw new Error('Models not initialized');
		const i = this.models.findIndex((m) => m.data && m.data.id === id);
		if (i !== -1) {
			this.models.splice(i, 1);
		}
	}
	protected update(id: IdType, data: T): void {
		if (!this.models) throw new Error('Models not initialized');
		const i = this.models.findIndex((m) => m.data && m.data.id === id);
		if (i === -1) {
			throw new Error('Model not found');
		}
		this.models[i].data = data;
	}
}
