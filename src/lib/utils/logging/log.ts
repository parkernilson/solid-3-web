import { PUBLIC_LOG_LEVEL } from '$env/static/public';

export type LogLevel = 'debug' | 'none';

export const log =
	(level: LogLevel) =>
	(...args: unknown[]) => {
		if (PUBLIC_LOG_LEVEL === level) {
			console.log(...args);
		}
	};

export const debug = log('debug');
