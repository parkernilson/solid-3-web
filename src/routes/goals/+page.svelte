<script lang="ts">
	import GoalListView from '$lib/components/goals/GoalListView.svelte';
	import HeaderBar from '$lib/components/nav/HeaderBar.svelte';
	import PagePadding from '$lib/components/ui/PagePadding.svelte';
	import ResponsiveCenterColumn from '$lib/components/ui/ResponsiveCenterColumn.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const presenter = data.goalsPagePresenter;
</script>

<ResponsiveCenterColumn>
	<PagePadding>
		<HeaderBar rootLayoutPresenter={data.rootLayoutPresenter} />
		<div class="w-full">
			{#if presenter.sharedGoalsWithMePending && presenter.sharedGoalsWithMePending.length > 0}
				<a
					aria-label="view share requests"
					class="block w-full bg-blue-light"
					href="/goals/share-requests"
				>
					<div class="w-full flex justify-between py-1 px-3">
						<p>{presenter.sharedGoalsWithMePending.length} Share Requests</p>
						<p>View</p>
					</div>
				</a>
			{/if}
			<div class="">
				<div class="mt-10 flex justify-between items-end">
					<h1 class="text-6xl">Goals</h1>
					<a href="/goals/create-goal" class="mb-2">Create new goal</a>
				</div>
				{#await data.loadingGoalsRoute}
					<p>Loading Goals Route</p>
					<!-- TODO: create loading ui -->
				{:then _}
					{#if presenter.displayedGoals}
						{#each presenter.displayedGoals as goalInfoModel}
						 	{#if goalInfoModel.data}
								<GoalListView goalInfo={goalInfoModel.data} goalInfoModel={goalInfoModel} />
							{/if}
						{/each}
					{/if}
				{/await}
			</div>
		</div>
	</PagePadding>
</ResponsiveCenterColumn>
