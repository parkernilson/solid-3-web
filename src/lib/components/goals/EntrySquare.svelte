<script lang="ts">
	import type { Entry, Goal } from "$lib/model/goals";
	import EntryModal from "./EntryModal.svelte";

    const { entry, goal }: { entry: Entry, goal: Goal } = $props();

    let showModal = $state(false);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={() => (showModal = true)} class="border h-32">
    <p>{entry.text_content}</p>
</div>

<EntryModal bind:showModal {entry} {goal} /> 
