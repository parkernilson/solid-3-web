<script lang="ts">
	import GoalOptionsPopover from '$lib/components/GoalOptionsPopover.svelte';
	import EntryGallery from '$lib/components/goals/EntryGallery.svelte';
	import HeaderStats from '$lib/components/goals/HeaderStats.svelte';
	import HeaderBar from '$lib/components/nav/HeaderBar.svelte';
	import PagePadding from '$lib/components/ui/PagePadding.svelte';
	import ResponsiveCenterColumn from '$lib/components/ui/ResponsiveCenterColumn.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const presenter = data.goalPagePresenter;
	const goalModel = data.goalModel;
</script>

<ResponsiveCenterColumn>
	<PagePadding>
		<HeaderBar rootLayoutPresenter={data.rootLayoutPresenter} />
	</PagePadding>
	{#await data.loadingGoalRoute}
		<p>loading goal</p>
	{:then _}
		{#if presenter.goalInfo}
			{@const goal = presenter.goalInfo}
			{@const sharedGoal = presenter.sharedGoalInfo}
			{@const streak = presenter.goalInfo.streak}
			{@const record = presenter.goalInfo.record}
			{@const isOwner = presenter.isOwner}
			<div class="">
				<PagePadding>
					<div class="flex mt-4 mb-4 items-center">
						<a aria-label="Back" href="/goals" class="mr-6"
							><i class="fa-solid fa-chevron-left fa-xl"></i></a
						>
						<div class="flex-1">
							<h1 class="text-2xl xs:text-3xl flex-1 text-center">{goal.title}</h1>
							{#if sharedGoal}
								<p class="text-center">{sharedGoal.ownerEmail}</p>
							{/if}
						</div>
						<GoalOptionsPopover goalId={goal.id} />
					</div>
					<HeaderStats
						streak={streak?.streakCount || 0}
						record={record?.streakCount || 0}
						startDate={goal.startDate}
					/>
					<div class="mt-4"></div>
				</PagePadding>
				<PagePadding bp="sm">
					<EntryGallery goal={presenter.goalInfo} {goalModel} {isOwner} />
				</PagePadding>
			</div>
		{:else}
			<p>Found no error, but goal was not defined</p>
		{/if}
	{:catch _}
		<p>Could not load goal</p>
	{/await}
</ResponsiveCenterColumn>
