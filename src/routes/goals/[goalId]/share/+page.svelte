<script lang="ts">
	import type { PageData } from "./$types";

    const { data }: { data: PageData } = $props();
    const presenter = data.shareGoalPagePresenter;
</script>


{#await data.loadingGoalRoute}
    <p>Loading...</p>
{:then _}
    {#if presenter.goal}
        <p>Share Goal: {presenter.goal.goal.title}</p>
    {/if}
{:catch _}
    <p>Error loading goal route</p>
{/await}