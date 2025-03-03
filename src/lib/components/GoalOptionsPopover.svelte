<script lang="ts">
	import Popover from './Popover.svelte';

	const { goalId }: { goalId: string } = $props();
</script>

<Popover>
    <a href="/goals/{goalId}/share" class="px-2 py-1 block w-full hover:bg-gray-100">Share</a>
</Popover>
