<script lang="ts">
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import { type IEntry, type IGoal } from '$lib/model/domain/goals';
	import { EntryGalleryPresenter } from '$lib/presenters/goals/EntryGalleryPresenter.svelte';
	import { getContext } from 'svelte';
	import Modal from '../Modal.svelte';

	let {
		entry,
		goal,
		showModal = $bindable()
	}: { entry: IEntry | null; goal: IGoal; showModal: boolean } = $props();

	const presenterFactory = getContext<PresenterFactory>("PresenterFactory")
	const entryGalleryPresenter = getContext<EntryGalleryPresenter>('EntryGalleryPresenter');
	const presenter = presenterFactory.createEntryModalPresenter(
		entryGalleryPresenter,
		goal,
		entry ?? undefined
	);

	async function updateEntry() {
		// TODO: Finish fixing the entry update operation
		// await presenter.optimisticallyUpsertEntry(presenter.newEntry);
		showModal = false;
	}
</script>

<Modal bind:showModal>
	{#snippet header()}<h1>{presenter.entry?.dateOf}</h1>{/snippet}
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
		<p>{presenter.entry?.textContent}</p>
	{/if}
</Modal>
