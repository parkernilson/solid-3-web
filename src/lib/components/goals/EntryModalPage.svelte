<script lang="ts">
	import type { EntryModalPresenter } from '$lib/presenters/goals/EntryModalPresenter.svelte';
	import DatePicker from '$lib/shadcn/components/ui/date-picker/DatePicker.svelte';
	import { fade } from 'svelte/transition';
	import ModalNavHeader from '../nav/ModalNavHeader.svelte';
	import Button from '../ui/Button.svelte';
	import PagePadding from '../ui/PagePadding.svelte';
	import ResponsiveCenterColumn from '../ui/ResponsiveCenterColumn.svelte';
	import SlideToggle from '../ui/SlideToggle.svelte';
	import FieldInput from '../FieldInput.svelte';

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
			<div class="h-full text-foreground">
				<div class="">
					{#if presenter.dateIsEditable && presenter.editing}
						<DatePicker bind:value={presenter.datePickerDateValue} />
					{:else}
						<p>{presenter.currentDateOfDisplay}</p>
					{/if}
					<label class="flex mt-2">
						<SlideToggle disabled={!presenter.editing} bind:checked={presenter.currentSuccess} />
						{#if presenter.currentSuccess}
							<p transition:fade={{ duration: 100 }} class="ml-1 text-foreground">Success</p>
						{/if}
					</label>
				</div>
				<div class="h-full pt-32">
					{#if presenter.editing}
						<div class="flex-1 flex flex-col items-center text-foreground">
							<div class="text-3xl w-full">
								<!-- TODO: replace with text area (use shadcn components) -->
								<FieldInput type="text" placeholder="" bind:value={presenter.currentTextContent} />
							</div>
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
