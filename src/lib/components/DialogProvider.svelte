<script lang="ts">
	import { getContext } from 'svelte';
	import Modal from './Modal.svelte';
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';

    const presenterFactory = getContext<PresenterFactory>("PresenterFactory");
	const dialogPresenter = presenterFactory.getDialogPresenterInstance();
</script>

<Modal bind:showModal={dialogPresenter.isOpen} showCloseButton={false}>
    {@const dialog = dialogPresenter.dialog}
    {#if dialog}
        {#if dialog.content.title}
            {#snippet header()}
                <h1>{dialog.content.title}</h1>
            {/snippet}
        {/if}

        <div>
            <p>{dialog.content.body}</p>
            <div class="flex content-around">
                {#if dialog.actions.accept}
                    <button onclick={() => dialogPresenter.handleDialogAction(dialog.actions.accept.handle)}
                        >{dialog.actions.accept.label}</button
                    >
                {/if}
                {#if dialog.actions.cancel}
                    <button onclick={() => dialogPresenter.handleDialogAction(dialog.actions.cancel!.handle)}
                        >{dialog.actions.cancel.label}</button
                    >
                {/if}
            </div>
        </div>
    {/if}
</Modal>
