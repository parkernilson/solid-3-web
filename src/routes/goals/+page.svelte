<script lang="ts">
	import { GoalsPagePresenter } from '$lib/presenters/goals/GoalsPagePresenter.svelte';
	const presenter = GoalsPagePresenter.make();

	$effect(() => {
		presenter.load();
	});
</script>

<h1>Goals</h1>
<p>User: {JSON.stringify(presenter.user)}</p>
<button onclick={presenter.logout.bind(presenter)}>Log out</button>
{#if presenter.loadingGoals}
    <p>Loading goals...</p>
{:else}
    {#if presenter.goals}
        {#each presenter.goals! as goal}
            <p>{goal.title}</p>
        {/each}
    {/if}
{/if}
