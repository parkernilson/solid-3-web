export class Debouncer {
	private timerId: NodeJS.Timeout | null = null;

	constructor(private waitMs: number) {}

	debounce<T extends unknown[]>(fn: (...args: T) => void): (...args: T) => void {
		return (...args: T) => {
			if (this.timerId) {
				clearTimeout(this.timerId);
			}

			this.timerId = setTimeout(() => {
				fn.apply(this, args);
				this.timerId = null;
			}, this.waitMs);
		};
	}
}
