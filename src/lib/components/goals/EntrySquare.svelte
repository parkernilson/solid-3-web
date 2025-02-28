<script lang="ts">
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import { type IEntry } from '$lib/model/domain/goals';
	import type { EntryDataModel } from '$lib/model/models/goals/EntryDataModel.svelte';
	import { getContext } from 'svelte';
	import EntryModal from './EntryModal.svelte';

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
	class="aspect-square min-h-12 flex flex-col p-2 bg-blue-light"
>
	<p class="self-end">{presenter.dateFormatted}</p>
	{#if presenter.entry.textContent}
		{@const len = presenter.entry.textContent.length}
		<div class="flex-1 flex flex-col justify-center">
			<p class={len > 20 ? 'text-lg' : 'text-xl'}>{presenter.entry.textContent}</p>
		</div>
	{/if}
</div>

<EntryModal bind:showModal={presenter.showModal} {entryModel} {isOwner} />
