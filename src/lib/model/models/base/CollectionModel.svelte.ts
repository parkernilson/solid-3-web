import type { Id, IdType } from '../../domain/Id';
import { OptimisticType, type IOptimistic } from '../../domain/Optimistic';
import { BaseModel } from './BaseModel.svelte';
import type { DataModel } from './DataModel.svelte';

export abstract class CollectionModel<
	T extends Id & IOptimistic,
> extends BaseModel {
	constructor(initialData?: T[]) {
		super();
		if (initialData) this.setItems(initialData);
	}

	protected abstract makeConstituentDataModel(data: T): DataModel<T>;
	protected abstract sendCreate(data: T): Promise<T>;
	protected abstract sendDelete(id: IdType): Promise<void>;
	protected abstract get(id: IdType): DataModel<T> | undefined;
	protected abstract add(data: T): void;
	protected abstract setItems(data: T[]): void;
	protected abstract remove(id: IdType): void;
	protected abstract update(id: IdType, data: T): void;

	async optimisticCreate(data: T): Promise<void> {
		try {
			this.add({
				...data,
				optimisticLocal: OptimisticType.Create
			});
			const result = await this.sendCreate(data);
			this.update(data.id, result);
		} catch (e) {
			console.error(e);
			this.remove(data.id);
		}
	}

	async optimisticDelete(id: IdType): Promise<void> {
		const originalItem = this.get(id)?.data;
		try {
			this.remove(id);
			await this.sendDelete(id);
		} catch (e) {
			console.error(e);
			if (originalItem) this.add(originalItem as T);
		}
	}
}
