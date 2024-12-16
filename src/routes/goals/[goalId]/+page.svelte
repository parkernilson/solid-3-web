<script lang="ts">
	import { page as pageStore } from '$app/stores';
	import GoalOptionsPopover from '$lib/components/GoalOptionsPopover.svelte';
	import EntryGallery from '$lib/components/goals/EntryGallery.svelte';
	import HeaderStats from '$lib/components/goals/HeaderStats.svelte';
	import Popover from '$lib/components/Popover.svelte';
	import { presenterFactory } from '$lib/factories';
	import { onMount } from 'svelte';
	import { fromStore } from 'svelte/store';
	const page = fromStore(pageStore);

	const presenter = presenterFactory.createGoalPagePresenter();

	onMount(async () => {
		await presenter.load({ goalId: page.current.params.goalId });
	});
</script>

{#if presenter.loading}
	<p>Loading goal...</p>
{:else if presenter.goal}
	{@const goal = presenter.goal.goal}
	{@const streak = presenter.goal.streak}
	{@const record = presenter.goal.record}
	<div class="px-3">
		<div class="flex mt-4">
			<a aria-label="Back" href="/goals" class="mr-6"
				><i class="fa-solid fa-chevron-left fa-xl"></i></a
			>
			<h1 class="text-xl flex-1">{goal.title}</h1>
			<GoalOptionsPopover goal={presenter.goal.goal} />
		</div>
		<HeaderStats
			streak={streak?.streakCount || 0}
			record={record?.streakCount || 0}
			startDate={goal.startDate}
		/>
		<EntryGallery goal={presenter.goal} />
	</div>
{:else}
	<p>Could not load goal</p>
{/if}
