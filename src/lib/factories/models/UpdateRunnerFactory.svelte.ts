import type { DataModel } from '$lib/model/models/base/DataModel.svelte';
import {
	ConcurrentUpdateRunner,
	ConsecutiveUpdateRunner,
	type ConcurrentUpdateRunnerConstructor,
	type ConsecutiveUpdateRunnerConstructor
} from '$lib/model/models/base/update-runners';

export class UpdateRunnerFactory {
	getConsecutiveUpdateRunnerConstructor<T>(): ConsecutiveUpdateRunnerConstructor<T> {
		return (model: DataModel<T>) => new ConsecutiveUpdateRunner<T>(model);
	}

	getConcurrentUpdateRunnerConstructor<T>(): ConcurrentUpdateRunnerConstructor<T> {
		return (model: DataModel<T>) => new ConcurrentUpdateRunner<T>(model);
	}
}
