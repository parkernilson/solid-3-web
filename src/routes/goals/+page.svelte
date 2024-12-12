<script lang="ts">
	import GoalListView from '$lib/components/goals/GoalListView.svelte';
	import { presenterFactory } from '$lib/factories';
	import { onMount } from 'svelte';

	const presenter = presenterFactory.createGoalsPagePresenter();

	onMount(async () => {
		await presenter.load();
	});
</script>

<h1>Goals</h1>
{#if presenter.loadingGoals}
	<p>Loading goals...</p>
{:else if presenter.goals}
	{#each presenter.goals! as goal}
		<a href="/goals/{goal.id}"><GoalListView {goal} /></a>
	{/each}
{/if}
