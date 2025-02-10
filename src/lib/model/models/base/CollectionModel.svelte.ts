import type { HasId, IdType } from '../../domain/Id';
import { OptimisticType, type IOptimistic } from '../../domain/Optimistic';
import { BaseModel } from './BaseModel.svelte';
import type { DataModel } from './DataModel.svelte';
import type { DataStructure } from './DataStructure.svelte';

export abstract class CollectionModel<
	T extends HasId & IOptimistic,
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

	protected get(id: IdType): DM | undefined {
		return this.dataStructure.get(id);
	}
	protected add(data: T) {
		this.dataStructure.add(this.makeConstituentDataModel(data));
	}
	protected setItems(data: T[]) {
		this.dataStructure.setItems(data.map(this.makeConstituentDataModel.bind(this)));
	}
	protected addItems(data: T[]) {
		this.dataStructure.addItems(data.map(this.makeConstituentDataModel.bind(this)));
	}
	protected remove(id: IdType) {
		this.dataStructure.remove(id);
	}
	protected update(id: IdType, data: T) {
		this.dataStructure.update(id, this.makeConstituentDataModel(data));
	}

	protected async optimisticCreate(data: T): Promise<void> {
		try {
			this.add({
				...data,
				optimisticLocal: OptimisticType.Create
			});
			const result = await this.sendCreate(data);
			this.update(data.id, result);
		} catch (e) {
			this.remove(data.id);
			throw e;
		}
	}

	protected async optimisticDelete(id: IdType): Promise<void> {
		const originalItem = this.get(id);
		this.remove(id);
		try {
			await this.sendDelete(id);
		} catch (e) {
			if (originalItem) this.dataStructure.add(originalItem);
			throw e;
		}
	}
}
