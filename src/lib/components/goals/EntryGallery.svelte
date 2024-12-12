<script lang="ts">
	import { presenterFactory } from '$lib/factories';
	import type { GoalInfo } from '$lib/model/goals';
	import { onMount, setContext } from 'svelte';
	import InfiniteScrollingContainer from '../InfiniteScrollingContainer.svelte';
	import EntrySquare from './EntrySquare.svelte';

	const { goal }: { goal: GoalInfo } = $props();

	const presenter = presenterFactory.createEntryGalleryPresenter(goal.id);

	setContext('EntryGalleryPresenter', presenter);

	onMount(async () => {
		await presenter.load();
	});
</script>

<InfiniteScrollingContainer 
    loadMoreItems={presenter.loadMoreEntries.bind(presenter)}
    hasMore={presenter.hasMoreEntries}
    loading={presenter.loadingMoreEntries}
>
	<div class="grid grid-cols-3">
		{#each presenter.entries as entry}
		    <EntrySquare {entry} {goal} />
        {/each}
	</div>
</InfiniteScrollingContainer>
