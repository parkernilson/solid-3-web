<script lang="ts">
	import { debug } from '$lib/utils/logging';
	import { onMount } from 'svelte';

	const {
		loadMoreItems,
		hasMore,
		loading,
		ready,
		children
	}: {
		loadMoreItems: () => Promise<void>;
		hasMore: boolean;
		loading: boolean;
		ready: boolean;
		children: any;
	} = $props();

	let observer = $state<IntersectionObserver>();
	let sentinel = $state<HTMLElement>();

	onMount(() => {
		observer = new IntersectionObserver(
			async (entries) => {
				const entry = entries[0];
				if (entry.isIntersecting && ready && !loading && hasMore) {
					await loadMoreItems();
				}
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 0
			}
		);

		if (sentinel) {
			observer.observe(sentinel);
		}

		// TODO: cleanup the observer to prevent memory leaks
	});
</script>

<div>
	{@render children?.()}
	{#if hasMore}<div class="mt-[-10px]" id="sentinel" bind:this={sentinel}></div>{/if}
</div>
