import type { Entry, Goal } from '$lib/model/goals';
import { AuthService } from '$lib/services/AuthService.svelte';
import { ErrorService } from '$lib/services/ErrorService.svelte';
import { GoalService } from '$lib/services/GoalService.svelte';
import { ErrorablePresenter } from '../ErrorablePresenter';
import type { EntryGalleryPresenter } from './EntryGalleryPresenter.svelte';

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

	constructor(
		private _entry: Entry,
		private _goal: Goal,
		private goalService: GoalService,
		errorService: ErrorService,
		private authService: AuthService,
		private entryGalleryPresenter: EntryGalleryPresenter
	) {
		super(errorService);
		this.isOwner = this.authService.user?.id === this.goal.owner;
	}

	static make(entry: Entry, goal: Goal, entryGalleryPresenter: EntryGalleryPresenter) {
		return new EntryModalPresenter(
			entry,
			goal,
			GoalService.make(),
			ErrorService.instance(),
			AuthService.instance(),
			entryGalleryPresenter
		);
	}

	async updateEntry(entry: Entry) {
		const oldEntry = $state.snapshot(this.entryGalleryPresenter.entries.find((e) => e.id === entry.id));
		this.entryGalleryPresenter.updateEntry(entry);
		try {
			await this.goalService.updateEntry({
				dateOf: entry.date_of,
				id: entry.id,
				success: entry.success,
				textContent: entry.text_content,
			});
		} catch(e) {
			if (oldEntry) this.entryGalleryPresenter.updateEntry(oldEntry);
			this.errorService.reportError(e);
		}
	}
}
