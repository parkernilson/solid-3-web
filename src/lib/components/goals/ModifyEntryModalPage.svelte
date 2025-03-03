<script lang="ts">
    import type { ModifyEntryModalMode } from '$lib/presenters/goals/ModifyEntryModalPresenter.svelte'
	import { getContext } from 'svelte';
	import ModalNavHeader from '../nav/ModalNavHeader.svelte';
	import PagePadding from '../ui/PagePadding.svelte';
	import ResponsiveCenterColumn from '../ui/ResponsiveCenterColumn.svelte';
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import type { IEntry } from '$lib/model/domain/goals';

	const { mode, entry }: { mode: ModifyEntryModalMode, entry?: IEntry } = $props();

	const presenterFactory = getContext<PresenterFactory>("PresenterFactory");
	const presenter = presenterFactory.createModifyEntryModalPresenter(mode, entry)

</script>

<ResponsiveCenterColumn>
	<PagePadding>
		<ModalNavHeader title={mode === 'create' ? 'Add Entry' : 'Edit Entry'} />
        <div class="">
			<input type="date" bind:value={presenter.currentDateOf} />
			<input type="checkbox" bind:value={presenter.currentSuccess} />
        </div>
		<div class="flex flex-col justify-center">
			<input type="text" bind:value={presenter.currentTextContent} />
		</div>
	</PagePadding>
</ResponsiveCenterColumn>
