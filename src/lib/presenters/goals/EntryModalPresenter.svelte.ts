import type { EntryUpsert } from '$lib/model/domain/goals';
import { Entry, Goal } from '$lib/model/domain/goals';
import { AuthService } from '$lib/services/AuthService.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { v4 as uuidv4 } from 'uuid';
import { ErrorHandlingPresenter } from '../ErrorHandlingPresenter';
import type { EntryGalleryPresenter } from './EntryGalleryPresenter.svelte';

export class EntryModalPresenter extends ErrorHandlingPresenter {
	private authService = $state<AuthService>();
	private _isOwner = $derived(
		this.authService?.user ? this.authService.user.id === this.goal.owner : false
	);
	private _isEditable = $derived(this.isOwner);
	private _isEditing = $state(false);

	public currentTextContent = $state<string | null>(Entry.defaults().textContent);
	public currentDateOf = $state(Entry.defaults().dateOf);
	public currentSuccess = $state(Entry.defaults().success);

	public newEntry = $derived<EntryUpsert>({
		id: this.entry?.id,
		goal: this.goal.id,
		textContent: this.currentTextContent,
		dateOf: this.currentDateOf,
		success: this.currentSuccess
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
		private goalService: GoalService,
		errorService: ErrorService,
		authService: AuthService,
		private entryGalleryPresenter: EntryGalleryPresenter
	) {
		super(errorService);
		this.authService = authService;
		if (_entry) {
			this.currentTextContent = _entry.textContent;
			this.currentDateOf = _entry.dateOf;
			this.currentSuccess = _entry.success;
		} else {
			this.isEditing = true;
		}
	}

	private createOptimisticEntry(entry: EntryUpsert): Entry {
		return Entry.fromJson({
			id: `temp-${uuidv4()}`,
			goal: entry.goal,
			textContent: entry.textContent,
			dateOf: entry.dateOf,
			success: entry.success,
			optimisticLocalOnly: true
		});
	}

	async optimisticallyUpsertEntry(entry: EntryUpsert) {
		const oldEntry = $state.snapshot(
			this.entryGalleryPresenter.entries.find((e) => e.id === entry.id)
		);

		const optimisticEntry = this.createOptimisticEntry(entry);

		// Create an optimistically estimation for the object that will be created
		await this.doErrorable({
			action: async () => {
				this.entryGalleryPresenter.upsertEntryLocal(optimisticEntry);
				const resultingEntry = await this.goalService.upsertEntry({
					goalId: entry.goal,
					entryId: entry.id,
					dateOf: entry.dateOf,
					success: entry.success,
					textContent: entry.textContent ?? undefined
				});
				if (!resultingEntry) throw new Error('No data returned from upsert_entry');
				this.entryGalleryPresenter.upsertEntryLocal(resultingEntry);
			},
			onError: () => {
				// Rollback optimistic update
				if (oldEntry) this.entryGalleryPresenter.upsertEntryLocal(Entry.fromJson(oldEntry));
				else this.entryGalleryPresenter.removeEntryLocal(optimisticEntry.id);
			}
		});
	}

	startEditing() {
		this.isEditing = true;
	}

	cancelEditing() {
		this.isEditing = false;
	}
}
