<script lang="ts">
	import ShareRequestListView from '$lib/components/goals/ShareRequestListView.svelte';
	import PageNavHeader from '$lib/components/nav/PageNavHeader.svelte';
	import ResponsiveCenterColumn from '$lib/components/ui/ResponsiveCenterColumn.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const presenter = data.presenter;
	const sharedGoalsModel = data.sharedGoalsModel;
</script>

<ResponsiveCenterColumn>
	<PageNavHeader title="Share Requests" />
	{#if presenter.sharedGoalsWithMePending}
		{#each presenter.sharedGoalsWithMePending as shareRecord}
			<ShareRequestListView {sharedGoalsModel} sharedGoalPreview={shareRecord} />
		{/each}
	{/if}
</ResponsiveCenterColumn>
