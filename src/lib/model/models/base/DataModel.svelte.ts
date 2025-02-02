import { BaseModel } from "./BaseModel.svelte";
import type { Id } from "../../domain/Id";
import type { IOptimistic } from "../../domain/Optimistic";

export abstract class DataModel<T extends IOptimistic & Id> extends BaseModel {
    public data = $state<T>();

    constructor(initialData?: T) {
        super();
        if (initialData) this.setData(initialData);
    }

    protected abstract sendUpdate(data: T): Promise<T>;
    protected setData(data?: T) {
        this.data = data;
    }

    protected async optimisticUpdate(data: T): Promise<void> {
        const originalData = this.data;
        try {
            this.setData({ ...data, optimisticLocalOnly: true });
            const result = await this.sendUpdate(data);
            this.setData(result);
        } catch (e) {
            console.error(e);
            this.setData(originalData);
        }
    }
}
