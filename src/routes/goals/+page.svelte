<script lang="ts">
	import GoalListView from '$lib/components/goals/GoalListView.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const presenter = data.goalsPagePresenter;

</script>

<h1>Goals</h1>
{#await data.loadingGoalsRoute}
	<p>Loading goals...</p>
{:then _}
	{@const sharedGoalsPending = presenter.sharedGoalsWithMePending}
	{#if sharedGoalsPending && sharedGoalsPending.length > 0}
		<a class="hover:text-blue-600" href="/goals/share-requests">{presenter.sharedGoalsWithMePending.length} share requests</a>
	{/if}
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