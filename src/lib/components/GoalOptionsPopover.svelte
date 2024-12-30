<script lang="ts">
	import Popover from './Popover.svelte';

	const { goalId }: { goalId: string } = $props();
</script>

<Popover>
    <a href="/goals/{goalId}/share" class="px-2 py-1">Share</a>
</Popover>
