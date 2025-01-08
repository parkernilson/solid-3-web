<script lang="ts">
	import GoalListView from '$lib/components/goals/GoalListView.svelte';
	import HeaderBar from '$lib/components/nav/HeaderBar.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const presenter = data.goalsPagePresenter;

</script>

<HeaderBar rootLayoutPresenter={data.rootLayoutPresenter} />
<div class="w-full">
	{#if presenter.sharedGoalsWithMePending && presenter.sharedGoalsWithMePending.length > 0}
		<a aria-label="view share requests" class="block w-full bg-blue-light" href="/goals/share-requests">
			<div class="w-full flex justify-between py-1 px-3">
				<p>{presenter.sharedGoalsWithMePending.length} Share Requests</p>
				<p>View</p>
			</div>
		</a>
	{/if}
	<div class="px-3">
		<div class="mt-10 flex justify-between items-end">
			<h1 class="text-6xl">Goals</h1>
			<a href="/goals/create-goal" class="mb-2">Create new goal</a>
		</div>
		{#await data.loadingGoalsRoute}
			<!-- TODO: create loading ui -->
		{:then _}
			{#each presenter.goals! as goalInfo}
				<a class="" href="/goals/{goalInfo.goal.id}"><GoalListView goal={goalInfo} /></a>
			{/each}
		{/await}
	</div>
</div>
