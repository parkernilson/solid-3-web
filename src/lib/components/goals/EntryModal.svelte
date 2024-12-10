<script lang="ts">
	import type { Entry, Goal } from "$lib/model/goals";
	import { EntryModalPresenter } from "$lib/presenters/goals/EntryModalPresenter.svelte";
    import Modal from "../Modal.svelte";

    let { entry, goal, showModal = $bindable() }: { entry: Entry, goal: Goal, showModal: boolean } = $props();

    const presenter = EntryModalPresenter.make(entry, goal);
</script>

<Modal bind:showModal>
    {#snippet header()}<h1>{presenter.entry.date_of}</h1>{/snippet}
    <p>{presenter.entry.text_content}</p>
    <p>Is Owner: {presenter.isOwner}</p>
    <p>Is Editable: {presenter.isEditable}</p>
    <p>Is Editing: {presenter.isEditing}</p>
</Modal>

