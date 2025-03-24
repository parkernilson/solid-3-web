import { goto } from '$app/navigation';
import type { ModelFactory } from '$lib/factories/models/ModelFactory.svelte';
import type { EntryUpdateParams, UserEntryCreateParams } from '$lib/model/domain/goals';
import type { EntryDataModel } from '$lib/model/models/goals/EntryDataModel.svelte';
import type { GoalModel } from '$lib/model/models/goals/GoalModel.svelte';
import { Routes } from '$lib/model/routes';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { DateEx } from '$lib/utils/dates';
import { type DateValue } from '@internationalized/date';
import { LoadablePresenter } from '../LoadablePresenter.svelte';

export type EntryModalMode = 'create' | 'view';

export class EntryModalPresenter extends LoadablePresenter {
	public currentTextContent = $state<string | undefined | null>();

	public datePickerDateValue = $state<DateValue>()!;
	private initialDate = $state<DateEx>(DateEx.todayDate());

	private displayFormatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});
	private currentDateOf = $derived<DateEx>(
		(this.datePickerDateValue
			? DateEx.fromISODateOnly(this.datePickerDateValue?.toString())
			: null) ?? this.initialDate
	);
	public currentDateOfDisplay = $derived<string>(this.displayFormatter.format(this.currentDateOf));
	public currentSuccess = $state<boolean>(true);

	public editing = $state<boolean>(false);

	private entryModel?: EntryDataModel;

	get modalTitle() {
		switch (this.mode) {
			case 'create':
				return 'Create Entry';
			case 'view':
				return 'View Entry';
			default:
				throw new Error('Invalid mode');
		}
	}

	constructor(
		errorService: ErrorService,
		private modelFactory: ModelFactory,
		private goalModel: GoalModel,
		private mode: EntryModalMode,
		private entryId?: string
	) {
		super(errorService);
		if (mode === 'view') {
			if (!entryId) throw new Error(`entryId is required in mode: ${mode}`);
			this.entryModel = goalModel.entryCollectionModel.getModel(entryId);
		}
		if (mode === 'create') {
			this.editing = true;
		}
	}

	async submit() {
		const params = {
			textContent: this.currentTextContent ?? null,
			dateOf: this.currentDateOf.toISODateOnlyString(),
			success: this.currentSuccess
		} satisfies EntryUpdateParams & UserEntryCreateParams;

		await goto(Routes.getGoalPageUrl(this.goalModel.goalId, this.goalModel.isSharedGoal));

		if (this.mode === 'create') {
			await this.doErrorable({ action: () => this.goalModel.createEntry(params) });
		} else {
			if (!this.entryId) throw new Error(`entryId is required in mode: ${this.mode}`);
			const id = this.entryId;
			await this.doErrorable({ action: () => this.goalModel.updateEntry(id, params) });
		}
	}

	protected async loadResource(): Promise<void> {
		if (this.mode === 'create') {
			return;
		}
		if (!this.entryId) throw new Error("entryId is required in mode: 'view'");
		if (!this.entryModel) {
			this.entryModel = this.modelFactory.createEntryDataModel(this.entryId!);
		}
		if (!this.entryModel.data) {
			await this.entryModel.load();
			if (!this.entryModel.data) {
				throw new Error('Entry load did not error, but no data was found');
			}
		}

		this.currentTextContent = this.entryModel.data.textContent;
		this.initialDate = DateEx.fromISODateOnly(this.entryModel.data.dateOf);
		this.currentSuccess = this.entryModel.data.success;
	}
}
