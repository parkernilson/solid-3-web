import { entryDateFormatter } from '$lib/model/entries/date-formatter';
import type { EntryUpsert } from '$lib/model/entries/EntryUpsert';
import type { Entry, Goal } from '$lib/model/goals';
import { AuthService } from '$lib/services/AuthService.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { SupabaseGoalService } from '$lib/services/SupabaseGoalService.svelte';
import { v4 as uuidv4 } from 'uuid';
import { ErrorablePresenter } from '../ErrorablePresenter';
import type { EntryGalleryPresenter } from './EntryGalleryPresenter.svelte';

export class EntryModalPresenter extends ErrorablePresenter {
	private authService = $state<AuthService>();
	private _isOwner = $derived(
		this.authService?.user ? this.authService.user.id === this.goal.owner : false
	);
	private _isEditable = $derived(this.isOwner);
	private _isEditing = $state(false);

    public currentTextContent = $state("");
    public newEntry: EntryUpsert = $derived({
        ...this.entry,
        goal: this.goal.id,
        text_content: this.currentTextContent
    })

	get entry() {
		return this._entry;
	}
	get goal() {
		return this._goal;
	}
	get isOwner() {
		return this._isOwner;
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
		private goalService: SupabaseGoalService,
		errorService: ErrorService,
		authService: AuthService,
		private entryGalleryPresenter: EntryGalleryPresenter
	) {
		super(errorService);
		this.authService = authService;
		if (_entry) {
			this.currentTextContent = _entry.text_content ?? "";
		} else {
			this.isEditing = true;
		}
	}

	// TODO: clean up this logic and make it more robust
	async optimisticallyUpsertEntry(entry: EntryUpsert) {
		const oldEntry = $state.snapshot(
			this.entryGalleryPresenter.entries.find((e) => e.id === entry.id)
		);

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
			optimisticLocalOnly: true
		};
		this.entryGalleryPresenter.upsertEntryLocal(optimisticEntry);

		try {
			// TODO: reimplement this
			// const { data, error } = await this.goalService.upsertEntry({
			// 	goalId: entry.goal,
			// 	entryId: entry.id,
			// 	dateOf: entry.date_of,
			// 	success: entry.success,
			// 	textContent: entry.text_content ?? undefined,
			// });
			// if (error) throw error;
			// if (!data) throw new Error('No data returned from upsert_entry');
			// this.entryGalleryPresenter.upsertEntryLocal(data);
		} catch (e) {
			// Rollback optimistic update
			if (oldEntry) this.entryGalleryPresenter.upsertEntryLocal(oldEntry);
			else this.entryGalleryPresenter.removeEntryLocal(optimisticEntry.id);

			this.errorService.reportError(e);
		}
	}

	startEditing() {
		this.isEditing = true;
	}

	cancelEditing() {
		this.isEditing = false;
	}
}
