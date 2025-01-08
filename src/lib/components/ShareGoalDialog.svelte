<script lang="ts">
	import type { Goal } from "$lib/model/domain/goals";
	import { getContext, onMount } from "svelte";
	import UserPicker from "./users/UserPicker.svelte";
	import { PresenterFactory } from "$lib/factories/presenters/PresenterFactory.svelte";

    const { goal }: { goal: Goal } = $props();

    const presenterFactory = getContext<PresenterFactory>("PresenterFactory")
    const presenter = presenterFactory.createShareGoalDialogPresenter(goal);

    onMount(async () => {
        await presenter.load({ goalId: goal.id });
    })

</script>

{#if presenter.loading}
    <p>Loading...</p>
{:else}
    {#if presenter.sharedWithUsers}
        <UserPicker 
            initialSelectedUsers={presenter.sharedWithUsers}
            beforeSelect={presenter.confirmShare.bind(presenter)}
            onSelect={presenter.doShare.bind(presenter)}
            beforeDeselect={presenter.confirmUnshare.bind(presenter)}
            onDeselect={presenter.doUnshare.bind(presenter)}
            excludeSelf={true}
        />
    {:else}
        <p>There was a problem loading the initial share records</p>
    {/if}
{/if}
