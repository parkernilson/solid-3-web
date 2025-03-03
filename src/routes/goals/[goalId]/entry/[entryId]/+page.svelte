<script lang="ts">
	import EntryModalPage from '$lib/components/goals/EntryModalPage.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<EntryModalPage presenter={data.entryModalPresenter} loadingPromise={data.entryModalLoading} />
