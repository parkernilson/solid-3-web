<script lang="ts">
	import Popover from './Popover.svelte';

	const { goalId }: { goalId: string } = $props();
</script>

<Popover>
    <a href="/goals/{goal.id}/share" class="px-2 py-1">Share</a>
</Popover>
