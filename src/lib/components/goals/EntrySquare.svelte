<script lang="ts">
	import CircleCheck from '$lib/assets/icons/circle-check.svelte';
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import { type IEntry } from '$lib/model/domain/goals';
	import type { EntryDataModel } from '$lib/model/models/goals/EntryDataModel.svelte';
	import { getContext, type Snippet } from 'svelte';
	import EntryModal from './EntryModal.svelte';

	const {
		entry,
		entryModel,
		isOwner
	}: { entry: IEntry; entryModel: EntryDataModel; isOwner: boolean } = $props();

	const presenterFactory = getContext<PresenterFactory>('PresenterFactory');
	const presenter = presenterFactory.createEntrySquarePresenter(entry);
</script>

{#snippet textContent(textContentFormatted: string)}
	<p class="overflow-hidden text-nowrap w-full xs:text-wrap text-ellipsis">{textContentFormatted}</p>
{/snippet}

{#snippet adjustTextSize(textContent: string | null | undefined, contentElement: Snippet<[string]>)}
	{#if textContent}
		{@const len = textContent.length}
		{#if presenter.textContentIsOneEmoji}
			<div class="w-full text-4xl xs:text-5xl">{@render contentElement(textContent)}</div>
		{:else if len < 30}
			<div class="w-full text-lg sm:text-xl">{@render contentElement(textContent)}</div>
		{:else if len < 100}
			<div class="w-full text-md sm:text-lg">{@render contentElement(textContent)}</div>
		{:else}
			<div class="w-full text-sm sm:text-md">{@render contentElement(textContent)}</div>
		{/if}
	{/if}
{/snippet}

<!-- TODO: make this accessible -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onclick={() => (presenter.showModal = true)}
	class="aspect-square min-h-12 flex flex-col p-2 overflow-clip bg-blue-light relative rounded-xl"
>
	<p class="self-end">{presenter.dateFormatted}</p>
	{#if presenter.textContentFormatted}
		<div class="relative overflow-clip flex-1 flex flex-col items-center justify-center pb-6 {presenter.textContentIsOneEmoji ? 'self-center' : ''}">
			{@render adjustTextSize(presenter.textContentFormatted, textContent)}
		</div>
	{/if}
	{#if !presenter.textContentIsOneEmoji}
		<div class="pointer-events-none invisible xs:visible absolute w-full h-12 bottom-0 bg-gradient-to-b from-transparent to-blue-light via-blue-light/75"></div>
	{/if}
	{#if presenter.entry.success}
		<div class="w-4 xs:w-6 absolute bottom-3 right-3">
			<CircleCheck />
		</div>
	{/if}
</div>

<EntryModal bind:showModal={presenter.showModal} entryModel={entryModel} {isOwner} />
