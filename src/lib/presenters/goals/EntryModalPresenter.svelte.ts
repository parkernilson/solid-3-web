import type { Entry, Goal } from '$lib/model/goals';
import { AuthService } from '$lib/services/AuthService.svelte';
import { ErrorService } from '$lib/services/ErrorService.svelte';
import { GoalService } from '$lib/services/GoalService.svelte';
import { ErrorablePresenter } from '../ErrorablePresenter';

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
		private authService: AuthService
	) {
		super(errorService);
		this.isOwner = this.authService.user?.id === this.goal.owner;
	}

	static make(entry: Entry, goal: Goal) {
		return new EntryModalPresenter(
			entry,
			goal,
			GoalService.make(),
			ErrorService.instance(),
			AuthService.instance()
		);
	}
}
