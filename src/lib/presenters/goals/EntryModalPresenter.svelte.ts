import { entryDateFormatter } from '$lib/model/entries/date-formatter';
import type { EntryUpsert } from '$lib/model/entries/EntryUpsert';
import type { Entry, Goal } from '$lib/model/goals';
import { AuthService } from '$lib/services/AuthService.svelte';
import { ErrorService } from '$lib/services/ErrorService.svelte';
import { GoalService } from '$lib/services/GoalService.svelte';
import { ErrorablePresenter } from '../ErrorablePresenter';
import type { EntryGalleryPresenter } from './EntryGalleryPresenter.svelte';
import { v4 as uuidv4 } from 'uuid';

export class EntryModalPresenter extends ErrorablePresenter {
	private _isOwner = $state<boolean>();
	private _isEditable = $derived(this.isOwner);
	private _isEditing = $state(false);

	get entry() {
		return this._entry;
	}
	get goal() {
		return this._goal;
	}
	get isOwner() {
		return this._isOwner;
	}
	private set isOwner(v) {
		this._isOwner = v;
	}
	get isEditable() {
		return this._isEditable;
	}
	get isEditing() {
		return this._isEditing;
	}
	private set isEditing(v) {
		this._isEditing = v;
	}

	constructor(
		private _entry: Entry | null,
		private _goal: Goal,
		private goalService: GoalService,
		errorService: ErrorService,
		private authService: AuthService,
		private entryGalleryPresenter: EntryGalleryPresenter
	) {
		super(errorService);
		this.isOwner = this.authService.user?.id === this.goal.owner;
		if (!_entry) {
			this.isEditing = true;
		}
	}

	static make(entry: Entry | null, goal: Goal, entryGalleryPresenter: EntryGalleryPresenter) {
		return new EntryModalPresenter(
			entry,
			goal,
			GoalService.make(),
			ErrorService.instance(),
			AuthService.instance(),
			entryGalleryPresenter
		);
	}

	// TODO: clean up this logic and make it more robust
	async optimisticallyUpsertEntry(entry: EntryUpsert) {
		const oldEntry = $state.snapshot(this.entryGalleryPresenter.entries.find((e) => e.id === entry.id));
		
		// Create an optimistically estimation for the object that will be created
		const optimisticEntry: Entry = {
			// Provide defaults so that we have a guaranteed full Entry object
			id: `temp-${uuidv4()}`,
			created_at: new Date().toISOString(),
			date_of: entryDateFormatter.format(new Date()),
			success: true,
			text_content: null,
			// Override with new values
			...entry,
			// This entry will be optimistic until the server confirms it
			optimisticLocalOnly: true,
		}
		this.entryGalleryPresenter.upsertEntryLocal(optimisticEntry);

		try {
			const { data, error } = await this.goalService.upsertEntry({
				goalId: entry.goal,
				entryId: entry.id,
				dateOf: entry.date_of,
				success: entry.success,
				textContent: entry.text_content ?? undefined,
			});

			if (error) throw error;
			if (!data) throw new Error('No data returned from upsert_entry');

			this.entryGalleryPresenter.upsertEntryLocal(data);
		} catch(e) {
			// Rollback optimistic update
			if (oldEntry) this.entryGalleryPresenter.upsertEntryLocal(oldEntry);
			else this.entryGalleryPresenter.removeEntryLocal(optimisticEntry.id);

			this.errorService.reportError(e);
		}
	}
}
