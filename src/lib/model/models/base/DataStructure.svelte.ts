import type { IdType } from "$lib/model/domain/Id";

export abstract class DataStructure<T, Id extends IdType = IdType> {
    protected key: (data: T) => Id;

    constructor(key: (data: T) => Id) {
        this.key = key;
    }

	abstract get(id: Id): T | undefined;
	abstract add(data: T): void;
	abstract setItems(data: T[]): void;
    abstract addItems(data: T[]): void;
	abstract remove(id: IdType): void;
	abstract update(id: IdType, data: T): void;
}