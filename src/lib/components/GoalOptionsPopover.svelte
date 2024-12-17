<script lang="ts">
	import Popover from './Popover.svelte';

	const { goalId }: { goalId: string } = $props();
</script>

<Popover>
	<a data-sveltekit-preload-data class="px-2 py-1" href="/goals/{goalId}/share">Share</a>
</Popover>
