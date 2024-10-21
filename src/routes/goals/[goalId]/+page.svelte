<script lang="ts">
	import { GoalPagePresenter } from "$lib/presenters/goals/GoalPagePresenter.svelte";
    import { page as pageStore } from "$app/stores";
	import { fromStore } from "svelte/store";
    const page = fromStore(pageStore);

    const presenter = GoalPagePresenter.make();
    const { goal, loadingGoal } = presenter;

    $effect(() => { presenter.loadPage(page.current.params.goalId) })

</script>

{#if loadingGoal}
    <p>Loading goal...</p>
{:else if goal}
    <h1>{goal.title}</h1>
{:else}
    <p>Could not load goal</p>
{/if}