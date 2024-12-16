import { Debouncer } from './Debouncer';

export const debounce =
	(waitMs: number): MethodDecorator =>
	(target, propertyKey, descriptor) => {
		const original = descriptor.value;
		if (!original || typeof original !== 'function') return descriptor;
		const debouncer = new Debouncer(waitMs);
		descriptor.value = debouncer.debounce(
			original as (...args: unknown[]) => void
		) as typeof original;
		return descriptor;
	};