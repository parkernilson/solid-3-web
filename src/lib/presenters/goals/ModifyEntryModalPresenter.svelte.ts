import type { IEntry } from '$lib/model/domain/goals';

export type ModifyEntryModalMode = 'create' | 'edit';

export class ModifyEntryModalPresenter {
	public currentTextContent = $state<string | undefined | null>();
	public currentDateOf = $state<string>(new Date().toLocaleDateString());
	public currentSuccess = $state<boolean>(true);

	constructor(
		private mode: ModifyEntryModalMode,
		private entry?: IEntry
	) {
		if (mode === 'edit') {
			if (!entry) throw new Error('Entry is required in edit mode');
			this.currentTextContent = entry.textContent;
			this.currentDateOf = entry.dateOf;
			this.currentSuccess = entry.success;
		}
	}
}
