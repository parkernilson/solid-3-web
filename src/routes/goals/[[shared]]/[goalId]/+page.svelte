<script lang="ts">
	import GoalOptionsPopover from '$lib/components/GoalOptionsPopover.svelte';
	import EntryGallery from '$lib/components/goals/EntryGallery.svelte';
	import HeaderStats from '$lib/components/goals/HeaderStats.svelte';
	import HeaderBar from '$lib/components/nav/HeaderBar.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const presenter = data.goalPagePresenter;

</script>

<HeaderBar rootLayoutPresenter={data.rootLayoutPresenter} />
{#await data.loadingGoalRoute}
	<p>loading goal</p>
{:then _}
	{#if presenter.goalInfo}
		{@const goal = presenter.goalInfo}
		{@const streak = presenter.goalInfo.streak}
		{@const record = presenter.goalInfo.record}
		<div class="px-3">
			<div class="flex mt-4">
				<a aria-label="Back" href="/goals" class="mr-6"
					><i class="fa-solid fa-chevron-left fa-xl"></i></a
				>
				<h1 class="text-xl flex-1">{goal.title}</h1>
				<GoalOptionsPopover goalId={goal.id} />
			</div>
			<HeaderStats
				streak={streak?.streakCount || 0}
				record={record?.streakCount || 0}
				startDate={goal.startDate}
			/>
			<EntryGallery goal={presenter.goalInfo} />
		</div>
	{:else}
		<p>Found no error, but goal was not defined</p>
	{/if}
{:catch _}
	<p>Could not load goal</p>
{/await}