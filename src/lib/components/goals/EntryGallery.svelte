<script lang="ts">
	import type { Entry, GoalWithStreak } from "$lib/model/goals";

    const { goal, entries }: { goal: GoalWithStreak; entries: Entry[]} = $props();

    const page1 = entries.slice(0, 9);

</script>

<div class="grid grid-cols-3">
    {#each page1 as entry}
        <div class="border h-8">

        </div>
    {/each}
</div>