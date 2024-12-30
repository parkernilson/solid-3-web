<script lang="ts">
	import type { PageData } from "./$types";

    const { data }: { data: PageData } = $props();
    const presenter = data.presenter
</script>

{#if presenter.sharedGoalsWithMePending}
    {#each presenter.sharedGoalsWithMePending as shareRecord}
        <div>
            <h1>{shareRecord.goalTitle}</h1>
            <p>{shareRecord.goalOwnerEmail}</p>
        </div>
    {/each}
{/if}
