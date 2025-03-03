<script lang="ts">
	import ModifyEntryModalPage from '$lib/components/goals/EntryModalPage.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<ModifyEntryModalPage
	mode="edit"
	entryId={data.entryId}
	goalRoutePresenter={data.goalRoutePresenter}
/>
