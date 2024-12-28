<script lang="ts">
	import type { PageData } from "./$types";

    const { data }: { data: PageData } = $props();
    const presenter = data.presenter
</script>

{#if presenter.sharedGoalsWithMePending}
    {#each presenter.sharedGoalsWithMePending as shareRecord}
        <div>
            <h1>{shareRecord.goalId}</h1>
        </div>
    {/each}
{/if}
