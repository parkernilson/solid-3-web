<script lang="ts">
	import { type IEntry } from '$lib/model/domain/goals';
	import type { EntryDataModel } from '$lib/model/models/goals/EntryDataModel.svelte';
	import EntryModal from './EntryModal.svelte';

	const {
		entry,
		entryModel,
		isOwner
	}: { entry: IEntry; entryModel: EntryDataModel; isOwner: boolean } = $props();

	let showModal = $state(false);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={() => (showModal = true)} class="border h-32">
	<p>{entry.textContent}</p>
</div>

<EntryModal bind:showModal {entryModel} {isOwner} />
