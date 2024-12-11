<script lang="ts">
	import type { Entry, Goal } from "$lib/model/goals";
	import { EntryModalPresenter } from "$lib/presenters/goals/EntryModalPresenter.svelte";
	import { getContext } from "svelte";
    import Modal from "../Modal.svelte";
	import { EntryGalleryPresenter } from "$lib/presenters/goals/EntryGalleryPresenter.svelte";

    let { entry, goal, showModal = $bindable() }: { entry: Entry, goal: Goal, showModal: boolean } = $props();

    const entryGalleryPresenter = getContext<EntryGalleryPresenter>("EntryGalleryPresenter");

    const presenter = EntryModalPresenter.make(entry, goal, entryGalleryPresenter);

    let currentTextContent = $state($state.snapshot(presenter.entry.text_content));
    let newEntry: Entry = $derived({
        ...presenter.entry,
        text_content: currentTextContent
    })

    async function updateEntry() {
        await presenter.updateEntry(newEntry);
        showModal = false;
    }

</script>

<Modal bind:showModal>
    {#snippet header()}<h1>{presenter.entry.date_of}</h1>{/snippet}
    {#if presenter.isEditable}
        <textarea bind:value={currentTextContent}></textarea>
        <button onclick={updateEntry}>Update</button>
    {:else}
        <p>{presenter.entry.text_content}</p>
    {/if}
</Modal>

