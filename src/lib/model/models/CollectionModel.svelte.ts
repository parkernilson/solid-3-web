import { BaseModel } from "./BaseModel.svelte";
import type { DataModel } from "./DataModel.svelte";
import type { Id, IdType } from "../domain/Id";
import type { Optimistic } from "../domain/Optimistic";
import { v4 as uuid } from "uuid";

export abstract class CollectionModel<T extends Optimistic & Id> extends BaseModel {
    constructor(initialData?: T[]) {
        super();
        if (initialData) this.setItems(initialData);
    }

    protected abstract makeConstituentDataModel(data: T): DataModel<T>;
    protected abstract sendCreate(data: Omit<T, 'id'>): Promise<T>;
    protected abstract sendDelete(id: IdType): Promise<void>;
    protected abstract get(id: IdType): DataModel<T> | undefined;
    protected abstract add(data: T): void;
    protected abstract setItems(data: T[]): void;
    protected abstract remove(id: IdType): void;
    protected abstract update(id: IdType, data: T): void;

    private createTempId() {
        return `templocal-${uuid()}`;
    }

    async optimisticCreate(data: Omit<T, 'id'>): Promise<void> {
        const tempId = this.createTempId();
        try {
            // NOTE: I believe this is guaranteed to be safe since data is of type T just without the id, and we are adding an id.
            //  however, we have to do some typescript trickery to make the compiler happy
            this.add({ ...data, id: tempId, optimisticLocalOnly: true } as unknown as T);
            const result = await this.sendCreate(data);
            this.update(tempId, result);
        } catch (e) {
            console.error(e);
            this.remove(tempId);
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