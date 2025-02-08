<script lang="ts">
	import ShareRequestListView from '$lib/components/goals/ShareRequestListView.svelte';
import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const presenter = data.presenter;
	const sharedGoalsModel = data.sharedGoalsModel;
</script>

{#if presenter.sharedGoalsWithMePending}
	{#each presenter.sharedGoalsWithMePending as shareRecord}
        <ShareRequestListView {sharedGoalsModel} sharedGoalPreview={shareRecord} />
	{/each}
{/if}
