/**
 * Extends the Date class with utility methods for this application.
 * DateEx is short for DateExtended
 */
export class DateEx extends Date {
	static isoDateOnlyRegex = /^(\d{4})-(\d{2})-(\d{2})$/;

	/**
	 * Returns a new DateExtended object at midnight of the given
	 * date in the current timezone of the user.
	 * @param {string} dateString - The date string in 'yyyy-mm-dd' format.
	 */
	static fromISODateOnly(dateString: string): DateEx {
		if (!DateEx.isoDateOnlyRegex.test(dateString)) {
			throw new Error(`Invalid date string: ${dateString}, expected 'yyyy-mm-dd'`);
		}
		return new DateEx(`${dateString}T00:00:00`);
	}

	toISODateOnlyString(): string {
		return this.toISOString().slice(0, 10);
	}

	/**
	 * @returns an object that represents the current date and time.
	 */
	static nowDate(): DateEx {
		return new DateEx();
	}

	/**
	 * @returns an object that represents the current date at midnight.
	 * For example, if called at 2021-09-01T12:34:56, it will return
	 * a date object representing 2021-09-01T00:00:00.
	 */
	static todayDate(): DateEx {
		const today = new DateEx();
		return new DateEx(today.getFullYear(), today.getMonth(), today.getDate());
	}

	/**
	 * @returns a date-only ISO string representing today's date.
	 * For example, if called at 2021-09-01T12:34:56, it will return
	 * the string '2021-09-01'.
	 */
	static todayDateOnlyString(): string {
		return DateEx.todayDate().toISOString().slice(0, 10);
	}

	static compare(a: DateEx, b: DateEx): number {
		return a.getTime() - b.getTime();
	}

	/**  */
	static compareDateOnlyStrings(dateOnlyStringA: string, dateOnlyStringB: string) {
		if (!DateEx.isoDateOnlyRegex.test(dateOnlyStringA)) {
			throw new Error(
				`Invalid date string on left hand side of comparison: ${dateOnlyStringA}, expected 'yyyy-mm-dd'`
			);
		}

		if (!DateEx.isoDateOnlyRegex.test(dateOnlyStringB)) {
			throw new Error(
				`Invalid date string on right hand side of comparison: ${dateOnlyStringB}, expected 'yyyy-mm-dd'`
			);
		}

		const dateA = DateEx.fromISODateOnly(dateOnlyStringA);
		const dateB = DateEx.fromISODateOnly(dateOnlyStringB);
		return DateEx.compare(dateA, dateB);
	}

	static diffDays(a: DateEx, b: DateEx): number {
		const diffTime = a.getTime() - b.getTime();
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	}
}
