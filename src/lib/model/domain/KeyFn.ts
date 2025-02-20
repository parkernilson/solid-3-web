import type { IdType } from "./HasId";

export type KeyFn<T, Id extends IdType = IdType> = (t: T) => Id;