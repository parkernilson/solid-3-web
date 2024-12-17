<script lang="ts">
	import GoalListView from '$lib/components/goals/GoalListView.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const presenter = data.goalsPagePresenter;

</script>

<h1>Goals</h1>
{#await data.loadingGoalsPage}
	<p>Loading goals...</p>
{:then _}
	{#if presenter.goals}
		{#each presenter.goals! as goalInfo}
			<a href="/goals/{goalInfo.goal.id}"><GoalListView goal={goalInfo} /></a>
		{/each}
	{:else}
		<p>Found no error, but goals were not defined</p>
	{/if}
{:catch _}
	<p>Could not load goals</p>
{/await}