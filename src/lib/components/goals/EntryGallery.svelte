<script lang="ts">
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import type { IGoalInfo } from '$lib/model/domain/goals';
	import { getContext, onMount, setContext } from 'svelte';
	import InfiniteScrollingContainer from '../InfiniteScrollingContainer.svelte';
	import EntrySquare from './EntrySquare.svelte';

	const { goal }: { goal: IGoalInfo } = $props();

	const presenterFactory = getContext<PresenterFactory>("PresenterFactory");
	const presenter = presenterFactory.createEntryGalleryPresenter(goal.id);

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
		{#each presenter.entries as entry}
		    <EntrySquare {entry} goal={goal} />
        {/each}
	</div>
</InfiniteScrollingContainer>
