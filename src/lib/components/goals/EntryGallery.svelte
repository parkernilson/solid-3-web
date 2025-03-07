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
	ready={presenter.loadedInitialEntries}
>
	<div class="grid grid-cols-3 gap-1">
		{#if !presenter.hasEntryToday && presenter.isOwner}
			<a aria-label="Create entry" href={presenter.getAddEntryUrl()}>
				<div
					class="aspect-square min-h-12 flex flex-col items-center justify-center p-2 text-blue-dark border-blue-light border-dotted border-[3px] rounded-xl"
				>
					<div class="flex flex-col items-center">
						<i class="fa-solid fa-pencil fa-2xl p-3"></i>
						<p class="mt-1">Create a new entry</p>
					</div>
				</div>
			</a>
		{/if}
		{#if presenter.entryModels}
			{#each presenter.entryModels as entryModel, i (entryModel.id)}
				{#if entryModel.data}
					<a href={presenter.getViewEntryUrl(entryModel.data.id)}>
						<EntrySquare entry={entryModel.data} {entryModel} {isOwner} />
					</a>
				{/if}
			{/each}
		{/if}
	</div>
</InfiniteScrollingContainer>
