<script lang="ts">
	import type { EntryModalPresenter } from '$lib/presenters/goals/EntryModalPresenter.svelte';
	import ModalNavHeader from '../nav/ModalNavHeader.svelte';
	import PagePadding from '../ui/PagePadding.svelte';
	import ResponsiveCenterColumn from '../ui/ResponsiveCenterColumn.svelte';

	const {
		presenter,
		loadingPromise
	}: {
		presenter: EntryModalPresenter;
		loadingPromise: Promise<void>;
	} = $props();
</script>

<ResponsiveCenterColumn>
	<PagePadding>
		<ModalNavHeader title={presenter.modalTitle} />
		{#await loadingPromise}
			<p>Loading...</p>
		{:then _}
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
		{/await}
	</PagePadding>
</ResponsiveCenterColumn>
