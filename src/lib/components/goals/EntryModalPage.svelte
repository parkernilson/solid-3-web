<script lang="ts">
	import type { EntryModalPresenter } from '$lib/presenters/goals/EntryModalPresenter.svelte';
	import ModalNavHeader from '../nav/ModalNavHeader.svelte';
	import Button from '../ui/Button.svelte';
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
			<div class="h-full text-dark">
				<div class="">
					{#if presenter.editing}
						<input class="block" type="date" bind:value={presenter.currentDateOf} />
					{:else}
						<p>{presenter.currentDateOf}</p>
					{/if}
					<label class="block">
						<input
							disabled={!presenter.editing}
							type="checkbox"
							bind:checked={presenter.currentSuccess}
						/>
						Success
					</label>
				</div>
				<div class="h-full pt-32">
					{#if presenter.editing}
						<textarea bind:value={presenter.currentTextContent}></textarea>
						<div class="text-white">
							<Button title="Submit" onClick={() => presenter.submit()} />
						</div>
					{:else}
						<p>{presenter.currentTextContent}</p>
					{/if}
				</div>
			</div>
		{/await}
	</PagePadding>
</ResponsiveCenterColumn>
