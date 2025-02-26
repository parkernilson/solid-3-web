// TODO: this will implement what the current CreatableCollectionModel does and replace it
// by passing it as a constructor (like the update runner) to the top level collection models
// instead of by inheritance

import type { IdType } from '$lib/model/domain/HasId';
import type { KeyFn } from '$lib/model/domain/KeyFn';
import type { CollectionModel } from '../CollectionModel.svelte';

type CreateFn<T, CreateTParams> = (createParams: CreateTParams) => Promise<T>;
type DeleteFn = (id: IdType) => Promise<void>;

interface CreateParams<T, CreateTParams> {
	createParams: CreateTParams;
    optimistic?: boolean;
	sendCreate: CreateFn<T, CreateTParams>;
}

interface DeleteParams {
	id: IdType;
    optimistic?: boolean;
	sendDelete: DeleteFn;
}

type GetOptimisticCreateTFn<T, OptimisticCreateTParams> = (params: OptimisticCreateTParams) => T;

export class CreateDeleteRunner<T, CreateTParams, CM extends CollectionModel<T>> {
	constructor(
		private model: CM,
		private key: KeyFn<T>,
		private getOptimisticCreateT: GetOptimisticCreateTFn<T, CreateTParams>
	) {}

	async create(params: CreateParams<T, CreateTParams>): Promise<void> {
        if (params.optimistic) {
            const data = this.getOptimisticCreateT(params.createParams);
            const id = this.key(data);
            this.model.add(data);
            try {
                const result = await params.sendCreate(params.createParams);
                this.model.updateWithNewId(id, result);
            } catch (e) {
                this.model.remove(id);
                throw e;
            }
        } else {
            await params.sendCreate(params.createParams);
        }
	}

	async optimisticDelete(params: DeleteParams): Promise<void> {
        if (params.optimistic) {
            const originalItem = this.model.getModel(params.id);
            this.model.remove(params.id);
            try {
                await params.sendDelete(params.id);
            } catch (e) {
                if (originalItem) this.model.addModel(originalItem);
                throw e;
            }
        } else {
			await params.sendDelete(params.id);
        }
	}
}
