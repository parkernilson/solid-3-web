<script lang="ts">
	import EntryModalPage from '$lib/components/goals/EntryModalPage.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<EntryModalPage mode="create" goalRoutePresenter={data.goalRoutePresenter} />
