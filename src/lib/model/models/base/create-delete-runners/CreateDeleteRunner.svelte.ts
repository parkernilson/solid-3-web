import type { IdType } from '$lib/model/domain/HasId';
import type { KeyFn } from '$lib/model/domain/KeyFn';
import type { CollectionModel } from '../CollectionModel.svelte';
import type { DataModel } from '../DataModel.svelte';

type CreateFn<T, CreateTParams> = (createParams: CreateTParams) => Promise<T>;
type DeleteFn = (id: IdType) => Promise<void>;

export interface ExecuteCreateParams<T, CreateTParams> {
	createParams: CreateTParams;
	optimistic?: boolean;
	/**
	 * This function is called with the data that will be created. If the function
	 * returns false, the item will be still be created, but not added to the collection.
	 *
	 * This may be useful for items in paginated collections that are not yet within
	 * the range of loaded items.
	 */
	shouldAdd?: (data?: T) => boolean;
	sendCreate: CreateFn<T, CreateTParams>;
}

export interface ExecuteDeleteParams {
	id: IdType;
	optimistic?: boolean;
	sendDelete: DeleteFn;
}

type GetOptimisticCreateTFn<T, OptimisticCreateTParams> = (params: OptimisticCreateTParams) => T;

export class CreateDeleteRunner<T, CreateTParams, DM extends DataModel<T>> {
	private _creating = $state(false);
	public get creating() {
		return this._creating;
	}

	private _deleting = $state(false);
	public get deleting() {
		return this._deleting;
	}

	constructor(
		private model: CollectionModel<T, CreateTParams, DM>,
		private key: KeyFn<T>,
		private getOptimisticCreateT: GetOptimisticCreateTFn<T, CreateTParams>
	) {}

	async create(params: ExecuteCreateParams<T, CreateTParams>): Promise<void> {
		this._creating = true;

		const data = this.getOptimisticCreateT(params.createParams);
		const optimisticId = this.key(data);

		const shouldAdd = params.shouldAdd?.(data) ?? true;

		if (params.optimistic && shouldAdd) this.model.add(data, true);

		try {
			const result = await params.sendCreate(params.createParams);
			if (params.optimistic && shouldAdd) {
				this.model.updateWithNewId(optimisticId, result);
			} else if (shouldAdd) {
				this.model.add(result);
			}
		} catch (e) {
			if (params.optimistic && shouldAdd) this.model.remove(optimisticId);
			throw e;
		} finally {
			this._creating = false;
		}
	}

	async delete(params: ExecuteDeleteParams): Promise<void> {
		this._deleting = true;

		const originalItem = this.model.getModel(params.id);
		if (params.optimistic) this.model.remove(params.id);

		try {
			await params.sendDelete(params.id);
			if (!params.optimistic) this.model.remove(params.id);
		} catch (e) {
			if (originalItem && params.optimistic) this.model.addModel(originalItem);
			throw e;
		} finally {
			this._deleting = false;
		}
	}
}
