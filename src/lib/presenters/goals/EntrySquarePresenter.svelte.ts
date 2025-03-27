import { Entry, type IEntry } from '$lib/model/domain/goals';
import { isOneEmoji } from '$lib/utils/strings';

export class EntrySquarePresenter {
	public entry = $state<Entry>()!;
	public showModal = $state(false);
	public readonly MAX_CHARS = 120;

	private formatter = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: '2-digit'
	});

	public dateFormatted = $derived(this.formatter.format(this.entry.dateOfObject));
	public textContentIsOneEmoji = $derived(
		this.entry.textContent ? isOneEmoji(this.entry.textContent) : false
	);
	public textContentFormatted = $derived.by(() => {
		if (!this.entry.textContent) {
			return undefined;
		}

		if (isOneEmoji(this.entry.textContent)) {
			return this.entry.textContent;
		}

		return this.entry.textContent;
	});

	constructor(entry: IEntry) {
		this.entry = Entry.fromJson(entry);
	}
}
