<script lang="ts">
	import type { GoalWithStreak } from '$lib/model/goals';
	import { EntryGalleryPresenter } from '$lib/presenters/goals/EntryGalleryPresenter.svelte';
	import { onMount } from 'svelte';
	import InfiniteScrollingContainer from '../InfiniteScrollingContainer.svelte';

	const { goal }: { goal: GoalWithStreak } = $props();

	const presenter = EntryGalleryPresenter.make(goal.id);

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
            <div class="border h-32">
                <p>{entry.text_content}</p>
            </div>
        {/each}
	</div>
</InfiniteScrollingContainer>
