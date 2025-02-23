<script lang="ts">
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import type { IGoalInfo } from '$lib/model/domain/goals';
	import { getContext, onMount, setContext } from 'svelte';
	import InfiniteScrollingContainer from '../InfiniteScrollingContainer.svelte';
	import EntrySquare from './EntrySquare.svelte';
	import type { GoalModel } from '$lib/model/models/goals/GoalModel.svelte';

	const { goal, goalModel }: { goal: IGoalInfo, goalModel: GoalModel } = $props();

	const presenterFactory = getContext<PresenterFactory>("PresenterFactory");
	const presenter = presenterFactory.createEntryGalleryPresenter(goal.id, goalModel);

	setContext('EntryGalleryPresenter', presenter);

	onMount(async () => {
		await presenter.load({});
	});
</script>

<InfiniteScrollingContainer 
    loadMoreItems={presenter.loadMoreEntries.bind(presenter)}
    hasMore={presenter.hasMoreEntries}
    loading={presenter.loadingMoreEntries}
>
	<div class="grid grid-cols-3">
		{#if presenter.entries}
			{#each presenter.entries as entry}
				<EntrySquare {entry} goal={goal} />
			{/each}
		{/if}
	</div>
</InfiniteScrollingContainer>
