<script lang="ts">
	import type { Goal } from "$lib/model/domain/goals";
	import Popover from "./Popover.svelte";
	import ShareGoalDialog from "./ShareGoalDialog.svelte";

    const { goal }: { goal: Goal } = $props();

</script>

<Popover>
    <a href="/goals/{goal.id}/share" class="px-2 py-1">Share</a>
</Popover>
