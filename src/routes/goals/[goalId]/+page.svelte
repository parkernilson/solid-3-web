<script lang="ts">
	import { GoalPagePresenter } from "$lib/presenters/goals/GoalPagePresenter.svelte";
    import { page as pageStore } from "$app/stores";
	import { fromStore } from "svelte/store";
	import { onMount } from "svelte";
    const page = fromStore(pageStore);

    const presenter = GoalPagePresenter.make();

    onMount(() => { presenter.loadPage(page.current.params.goalId) })

</script>

{#if presenter.loadingPage}
    <p>Loading goal...</p>
{:else if presenter.goal}
    <h1>{presenter.goal.title}</h1>
    <p>Streak: {presenter.goal.streak.streak_count}</p>
    {#each presenter.entries! as entry}
        <p>{entry.text_content}</p>
    {/each}
{:else}
    <p>Could not load goal</p>
{/if}