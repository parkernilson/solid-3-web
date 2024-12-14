export interface IEntry {
	id: string;
	goal: string;
	textContent: string | null;
	dateOf: string;
	success: boolean;
	optimisticLocalOnly?: boolean;
}

export class Entry implements IEntry {
	get id() {
		return this._id;
	}
	get goal() {
		return this._goal;
	}
	get textContent() {
		return this._textContent;
	}
	get dateOf() {
		return this._dateOf;
	}
	get success() {
		return this._success;
	}
	get optimisticLocalOnly() {
		return this._optimisticLocalOnly;
	}

	constructor(
		private _id: string,
		private _goal: string,
		private _textContent: string | null,
		private _dateOf: string,
		private _success: boolean,
		private _optimisticLocalOnly?: boolean
	) {}

	private static formatDate(date: Date): string {
		const dateFormatter = new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
		return dateFormatter.format(date);
	}

	static defaults = () => ({
		dateOf: this.formatDate(new Date()),
		textContent: null,
		success: true,
	});

	static fromJson(json: IEntry): Entry {
		return new Entry(
			json.id,
			json.goal,
			json.textContent,
			json.dateOf,
			json.success,
			json.optimisticLocalOnly
		);
	}
}
