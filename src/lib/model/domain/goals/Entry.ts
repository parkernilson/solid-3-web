import { compareDates } from "$lib/utils/compare/compare-dates";
import { Optimistic } from "../Optimistic";

export interface IEntry {
	id: string;
	goal: string;
	textContent: string | null;
	dateOf: string;
	success: boolean;
}

export type EntryCreateParams = Pick<IEntry, 'goal' | 'textContent' | 'dateOf' | 'success'>;
export type EntryUpdateOptimisticParams = Pick<IEntry, 'textContent' | 'dateOf' | 'success'>;

export class Entry implements IEntry {
	get dateOfObject() {
		return new Date(this.dateOf);
	}

	constructor(
		public id: string,
		public goal: string,
		public textContent: string | null,
		public dateOf: string,
		public success: boolean,
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
		);
	}

	toJson(): IEntry {
		return {
			id: this.id,
			goal: this.goal,
			textContent: this.textContent,
			dateOf: this.dateOf,
			success: this.success,
		}
	}

	static createOptimistic(p: EntryCreateParams): IEntry {
		return {
			id: Optimistic.getTempId(),
			goal: p.goal,
			textContent: p.textContent,
			dateOf: p.dateOf,
			success: p.success,
		};
	}

	static getAppliedUpdateOptimistic(entry: IEntry, p: EntryUpdateOptimisticParams): IEntry {
		return {
			...entry,
			...p,
		};
	}

	static compareByDate(a: IEntry, b: IEntry): number {
		return compareDates(a.dateOf, b.dateOf);
	}
}
