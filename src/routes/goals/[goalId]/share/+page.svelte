<script lang="ts">
	import ShareGoalDialog from "$lib/components/ShareGoalDialog.svelte";
    import type { PageData } from "./$types";

    const { data }: { data: PageData } = $props();
    const presenter = data.shareGoalPagePresenter;
</script>

{#await data.loadingGoalRoute}
    <p>Loading...</p>
{:then _}
    {#if presenter.goal}
        <p>Share Goal: {presenter.goal.goal.title}</p>
        <ShareGoalDialog goal={presenter.goal.goal} />
    {/if}
{:catch _}
    <p>Error loading goal route</p>
{/await}
