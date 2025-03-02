import { Entry, type IEntry } from '$lib/model/domain/goals';
import { isOneEmoji } from '$lib/utils/strings';

export class EntrySquarePresenter {
	public entry: Entry;
	public showModal = $state(false);
	public readonly MAX_CHARS = 120;

	private formatter = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: '2-digit'
	});

	public get dateFormatted() {
		return this.formatter.format(this.entry.dateOfObject);
	}

	public get textContentIsOneEmoji() {
		return this.entry.textContent ? isOneEmoji(this.entry.textContent) : false;
	}

	public get textContentFormatted() {
		if (!this.entry.textContent) {
			return undefined; 
		}

		if (isOneEmoji(this.entry.textContent)) {
			return this.entry.textContent;
		}

		// TODO: remove this and replace with css truncation
		// const len = this.entry.textContent.length;
		// return len < this.MAX_CHARS
		// 	? this.entry.textContent
		// 	: this.entry.textContent?.substring(0, this.MAX_CHARS) + '...';
		return this.entry.textContent;
	}

	constructor(entry: IEntry) {
		this.entry = Entry.fromJson(entry);
	}
}
