<script lang="ts">
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import { GoalRoutePresenter } from '$lib/presenters/goals/GoalRoutePresenter.svelte';
	import type { EntryModalMode } from '$lib/presenters/goals/EntryModalPresenter.svelte';
	import { getContext } from 'svelte';
	import ModalNavHeader from '../nav/ModalNavHeader.svelte';
	import PagePadding from '../ui/PagePadding.svelte';
	import ResponsiveCenterColumn from '../ui/ResponsiveCenterColumn.svelte';

	const {
		mode,
		entryId,
		goalRoutePresenter
	}: { mode: EntryModalMode; entryId?: string; goalRoutePresenter: GoalRoutePresenter } = $props();

	const presenterFactory = getContext<PresenterFactory>('PresenterFactory');
	const presenter = presenterFactory.createEntryModalPresenter(goalRoutePresenter, mode, entryId);
</script>

<ResponsiveCenterColumn>
	<PagePadding>
		<ModalNavHeader title={presenter.modalTitle} />
		<div class="">
			<div class="">
				{#if presenter.editing}
					<input class="block" type="date" bind:value={presenter.currentDateOf} />
				{:else}
					<p>{presenter.currentDateOf}</p>
				{/if}
				<input
					disabled={!presenter.editing}
					class="block"
					type="checkbox"
					bind:checked={presenter.currentSuccess}
				/>
			</div>
			<div class="flex flex-col justify-center">
				{#if presenter.editing}
					<input type="text" bind:value={presenter.currentTextContent} />
				{:else}
					<p>{presenter.currentTextContent}</p>
				{/if}
			</div>
		</div>
	</PagePadding>
</ResponsiveCenterColumn>
