<script lang="ts">
	import GoalListView from '$lib/components/goals/GoalListView.svelte';
	import { GoalsPagePresenter } from '$lib/presenters/goals/GoalsPagePresenter.svelte';
	import { onMount } from 'svelte';
	const presenter = $state(GoalsPagePresenter.make());

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
