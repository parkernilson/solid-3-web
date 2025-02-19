import type { DataModel } from "../DataModel.svelte";
import type { ConcurrentUpdateRunner } from "./ConcurrentUpdateRunner.svelte";
import type { ConsecutiveUpdateRunner } from "./ConsecutiveUpdateRunner.svelte";
import type { UpdateRunner } from "./UpdateRunner.svelte";

export type UpdateRunnerConstructor<T> = (model: DataModel<T>) => UpdateRunner<T>;
export type ConsecutiveUpdateRunnerConstructor<T> = (model: DataModel<T>) => ConsecutiveUpdateRunner<T>;
export type ConcurrentUpdateRunnerConstructor<T> = (model: DataModel<T>) => ConcurrentUpdateRunner<T>;