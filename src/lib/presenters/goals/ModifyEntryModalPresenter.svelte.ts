import type { GoalRoutePresenter } from './GoalRoutePresenter.svelte';

export type ModifyEntryModalMode = 'create' | 'edit';

export class ModifyEntryModalPresenter {
	public currentTextContent = $state<string | undefined | null>();
	public currentDateOf = $state<string>(new Date().toLocaleDateString());
	public currentSuccess = $state<boolean>(true);

	constructor(
		private goalRoutePresenter: GoalRoutePresenter,
		private mode: ModifyEntryModalMode,
		private entryId?: string
	) {
		if (mode === 'edit') {
			if (!entryId) throw new Error('entryId is required in edit mode');
			const entryModel = goalRoutePresenter.goalModel.entryCollectionModel.getModel(entryId);
			const entry = entryModel?.data;
			if (!entry) throw new Error('entry not found');

			this.currentTextContent = entry.textContent;
			this.currentDateOf = entry.dateOf;
			this.currentSuccess = entry.success;
		}
	}
}
