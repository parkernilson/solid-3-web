<script lang="ts">
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import type { IGoalInfo } from '$lib/model/domain/goals';
	import type { GoalModel } from '$lib/model/models/goals/GoalModel.svelte';
	import { getContext, onMount } from 'svelte';
	import InfiniteScrollingContainer from '../InfiniteScrollingContainer.svelte';
	import EntrySquare from './EntrySquare.svelte';

	const { goal, goalModel, isOwner }: { goal: IGoalInfo; goalModel: GoalModel; isOwner: boolean } =
		$props();

	const presenterFactory = getContext<PresenterFactory>('PresenterFactory');
	const presenter = presenterFactory.createEntryGalleryPresenter(goal.id, goalModel);

	onMount(async () => {
		await presenter.load({});
	});
</script>

<InfiniteScrollingContainer
	loadMoreItems={presenter.loadMoreEntries.bind(presenter)}
	hasMore={presenter.hasMoreEntries}
	loading={presenter.loadingMoreEntries}
>
	<div class="grid grid-cols-3 gap-1">
		{#if !presenter.hasEntryToday}
			<a aria-label="Create entry" href={presenter.getAddEntryUrl()}>
				<div class="aspect-square min-h-12 flex flex-col p-2 bg-blue-light rounded-xl">
					<p>Tap here to create entry</p>
				</div>
			</a>
		{/if}
		{#if presenter.entryModels}
			{#each presenter.entryModels as entryModel, i}
				{#if entryModel.data}
					<a href={presenter.getViewEntryUrl(entryModel.data.id)}>
						<EntrySquare entry={entryModel.data} {entryModel} {isOwner} />
					</a>
				{/if}
			{/each}
		{/if}
	</div>
</InfiniteScrollingContainer>
