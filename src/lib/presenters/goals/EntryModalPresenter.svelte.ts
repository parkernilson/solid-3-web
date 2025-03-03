import type { GoalRoutePresenter } from './GoalRoutePresenter.svelte';

export type EntryModalMode = 'create' | 'edit' | 'view';

export class EntryModalPresenter {
	public currentTextContent = $state<string | undefined | null>();
	public currentDateOf = $state<string>(new Date().toLocaleDateString());
	public currentSuccess = $state<boolean>(true);

	public editing = $state<boolean>(false);

	get modalTitle() {
		switch (this.mode) {
			case 'create':
				return 'Create Entry'
			case 'edit':
				return 'Edit Entry'
			case 'view':
				return 'View Entry'
			default:
				throw new Error("Invalid mode")
		}
	}

	constructor(
		private goalRoutePresenter: GoalRoutePresenter,
		private mode: EntryModalMode,
		private entryId?: string
	) {
		if (mode === 'edit' || mode === 'view') {
			if (!entryId) throw new Error(`entryId is required in mode: ${mode}`);
			const entryModel = goalRoutePresenter.goalModel.entryCollectionModel.getModel(entryId);
			const entry = entryModel?.data;
			if (!entry) throw new Error('entry not found');

			this.currentTextContent = entry.textContent;
			this.currentDateOf = entry.dateOf;
			this.currentSuccess = entry.success;
		}
	}
}
