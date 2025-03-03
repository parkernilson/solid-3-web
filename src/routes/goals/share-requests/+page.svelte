<script lang="ts">
	import ShareRequestListView from '$lib/components/goals/ShareRequestListView.svelte';
	import PageNavHeader from '$lib/components/nav/PageNavHeader.svelte';
	import PagePadding from '$lib/components/ui/PagePadding.svelte';
	import ResponsiveCenterColumn from '$lib/components/ui/ResponsiveCenterColumn.svelte';
	import { SharedGoalPreviewDataModel } from '$lib/model/models/goals/SharedGoalPreviewDataModel.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const presenter = data.presenter;
	const sharedGoalsModel = data.sharedGoalsModel;
</script>

<ResponsiveCenterColumn>
	<PagePadding>
		<PageNavHeader title="Share Requests" />
		{#if presenter.sharedGoalsWithMePending}
			{#each presenter.sharedGoalsWithMePending as sharedGoalPreviewDataModel}
				{#if sharedGoalPreviewDataModel.data}
					<ShareRequestListView {sharedGoalsModel} sharedGoalPreview={sharedGoalPreviewDataModel.data} />
				{/if}
			{/each}
		{/if}
	</PagePadding>
</ResponsiveCenterColumn>
