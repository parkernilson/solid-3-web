<script lang="ts">
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import type { EntryDataModel } from '$lib/model/models/goals/EntryDataModel.svelte';
	import { getContext } from 'svelte';
	import Modal from '../Modal.svelte';

	let {
		entryModel,
		isOwner,
		showModal = $bindable()
	}: {
		entryModel: EntryDataModel;
		isOwner: boolean;
		showModal: boolean;
	} = $props();

	const presenterFactory = getContext<PresenterFactory>('PresenterFactory');
	const presenter = presenterFactory.createEntryModalPresenter(
		entryModel,
		isOwner
	);

	async function updateEntry() {
		// TODO: Finish fixing the entry update operation
		// await presenter.optimisticallyUpsertEntry(presenter.newEntry);
		showModal = false;
	}
</script>

<Modal bind:showModal>
	{#snippet header()}<h1>{presenter.currentDateOf}</h1>{/snippet}
	<div>
		{#if presenter.isEditing}
			<button onclick={presenter.cancelEditing.bind(presenter)}>Cancel</button>
		{:else}
			<button onclick={presenter.startEditing.bind(presenter)}>Edit</button>
		{/if}
	</div>
	{#if presenter.isEditing}
		<textarea bind:value={presenter.currentTextContent}></textarea>
		<button class="block" onclick={updateEntry}>Update</button>
	{:else}
		<p>{presenter.currentTextContent}</p>
	{/if}
</Modal>
