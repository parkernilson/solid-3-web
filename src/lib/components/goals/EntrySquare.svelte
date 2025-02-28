<script lang="ts">
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import { type IEntry } from '$lib/model/domain/goals';
	import type { EntryDataModel } from '$lib/model/models/goals/EntryDataModel.svelte';
	import { getContext } from 'svelte';
	import EntryModal from './EntryModal.svelte';
	import CircleCheck from '$lib/assets/icons/circle-check.svelte';

	const {
		entry,
		entryModel,
		isOwner
	}: { entry: IEntry; entryModel: EntryDataModel; isOwner: boolean } = $props();

	const presenterFactory = getContext<PresenterFactory>('PresenterFactory');
	const presenter = presenterFactory.createEntrySquarePresenter(entry);
</script>

<!-- TODO: make this accessible -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onclick={() => (presenter.showModal = true)}
	class="aspect-square min-h-12 flex flex-col p-2 bg-blue-light relative box-border"
>
	<p class="self-end">{presenter.dateFormatted}</p>
	{#if presenter.entry.textContent}
		{@const len = presenter.entry.textContent.length}
		<div class="flex-1 flex items-center pb-6">
			<!-- TODO: make the text change size based on length (calculate based on max characters) -->
			 <!-- and truncate the text based on max character length (take emojis into account) -->
			<p class="
			 	{len < 10 ? 'text-lg' : len < 20 ? 'text-md' : 'text-sm'}
				sm:{len < 10 ? 'text-xl' : len < 20 ? 'text-lg' : 'text-md'}
			">{presenter.entry.textContent}</p>
		</div>
	{/if}
	{#if presenter.entry.success}
		<div class="w-4 xs:w-6 absolute bottom-3 right-3">
			<CircleCheck />
		</div>
	{/if}
</div>

<EntryModal bind:showModal={presenter.showModal} {entryModel} {isOwner} />
