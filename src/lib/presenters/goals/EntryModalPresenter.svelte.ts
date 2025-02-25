import { Entry } from '$lib/model/domain/goals';
import type { EntryDataModel } from '$lib/model/models/goals/EntryDataModel.svelte';

export class EntryModalPresenter {
	public isEditing = $state(false);

	public currentTextContent = $state<string | null>(Entry.defaults().textContent);
	public currentDateOf = $state(Entry.defaults().dateOf);
	public currentSuccess = $state(Entry.defaults().success);

	get isEditable() {
		return this.isOwner;
	}

	constructor(
		entryModel: EntryDataModel,
		public isOwner: boolean,
	) {
		if (entryModel.data) {
			this.currentTextContent = entryModel.data.textContent;
			this.currentDateOf = entryModel.data.dateOf;
			this.currentSuccess = entryModel.data.success;
		} else {
			this.isEditing = true;
		}
	}

	startEditing() {
		this.isEditing = true;
	}

	cancelEditing() {
		this.isEditing = false;
	}
}
