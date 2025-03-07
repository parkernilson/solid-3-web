import {
	ConcurrentUpdateRunner,
	ConsecutiveUpdateRunner
} from '$lib/model/models/base/update-runners';

export class UpdateRunnerFactory {
	getConsecutiveUpdateRunner(): ConsecutiveUpdateRunner {
		return new ConsecutiveUpdateRunner();
	}

	getConcurrentUpdateRunner(): ConcurrentUpdateRunner {
		return new ConcurrentUpdateRunner();
	}
}
