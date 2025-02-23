<script lang="ts">
	import { type IEntry, type IGoal } from "$lib/model/domain/goals";
	import EntryModal from "./EntryModal.svelte";

    const { entry, goal }: { entry: IEntry, goal: IGoal } = $props();

    let showModal = $state(false);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={() => (showModal = true)} class="border h-32">
    <p>{entry.textContent}</p>
</div>

<EntryModal bind:showModal {entry} {goal} /> 
