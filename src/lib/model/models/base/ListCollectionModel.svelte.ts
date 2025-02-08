import { filterUndefined } from '$lib/utils/types';
import type { Id, IdType } from '../../domain/Id';
import { CollectionModel } from './CollectionModel.svelte';
import type { DataModel } from './DataModel.svelte';

export abstract class ListCollectionModel<T extends Id, DM extends DataModel<T> = DataModel<T>> extends CollectionModel<T, DM> {
	private _models = $state<DM[]>();
	private _data = $derived(
		this.models ? filterUndefined(this.models.map((m) => m.data)) : undefined
	);

	get models() {
		return this._models;
	}
	private set models(models: DM[] | undefined) {
		this._models = models;
	}
	get data() {
		return this._data;
	}
	private set data(data: T[] | undefined) {
		this._data = data;
	}

	constructor(initialData?: T[]) {
		super(initialData);
	}

	protected get(id: IdType): DM | undefined {
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
