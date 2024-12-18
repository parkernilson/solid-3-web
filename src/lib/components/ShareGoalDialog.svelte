<script lang="ts">
	import { presenterFactory } from "$lib/factories";
	import type { Goal } from "$lib/model/domain/goals";
	import { onMount } from "svelte";
	import UserPicker from "./users/UserPicker.svelte";

    const { goal }: { goal: Goal } = $props();

    const presenter = presenterFactory.createShareGoalDialogPresenter(goal);

    onMount(async () => {
        await presenter.load({ goalId: goal.id });
    })

</script>

{#if presenter.loading}
    <p>Loading...</p>
{:else}
    {#if presenter.sharedWithUsers}
        <!-- TODO: add the handlers for sharing with and unsharing with users -->
        <UserPicker 
            initialSelectedUsers={presenter.sharedWithUsers}
            beforeSelect={presenter.confirmShare.bind(presenter)}
            onSelect={presenter.doShare.bind(presenter)}
            beforeDeselect={presenter.confirmUnshare.bind(presenter)}
            onDeselect={presenter.doUnshare.bind(presenter)}
        />
    {:else}
        <p>There was a problem loading the initial share records</p>
    {/if}
{/if}
