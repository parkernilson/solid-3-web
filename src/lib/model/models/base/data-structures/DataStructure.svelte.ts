import type { IdType } from "$lib/model/domain/HasId";

export abstract class DataStructure<T> {
    public key: (data: T) => IdType;

    constructor(key: (data: T) => IdType) {
        this.key = key;
    }

	abstract get(id: IdType): T | undefined;
	abstract add(data: T): void;
	abstract setItems(data: T[]): void;
    abstract addItems(data: T[]): void;
	abstract remove(id: IdType): void;
	abstract update(id: IdType, data: T): void;
}