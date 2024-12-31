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
            <button onclick={() => {
                presenter.acceptShareRequest(shareRecord.goalId)
            }} class="block mx-2">Accept</button>
            <button onclick={() => {
                presenter.rejectShareRequest(shareRecord.goalId)
            }} class="block mx-2">Reject</button>
        </div>
    {/each}
{/if}
