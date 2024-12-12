<script lang="ts">
	import { page as pageStore } from "$app/stores";
	import EntryGallery from "$lib/components/goals/EntryGallery.svelte";
	import HeaderStats from "$lib/components/goals/HeaderStats.svelte";
	import { presenterFactory } from "$lib/factories";
	import { onMount } from "svelte";
	import { fromStore } from "svelte/store";
    const page = fromStore(pageStore);

    const presenter = presenterFactory.createGoalPagePresenter();

    onMount(async () => { await presenter.loadPage(page.current.params.goalId) })

</script>

{#if presenter.loadingPage}
    <p>Loading goal...</p>
{:else if presenter.goal}
    <div class="px-3">
        <div class="flex mt-4">
            <a aria-label="Back" href="/goals" class="mr-6"><i class="fa-solid fa-chevron-left fa-xl"></i></a>
            <h1 class="text-xl">{presenter.goal.title}</h1>
        </div>
        <HeaderStats
            streak={presenter.goal.streak.streak_count || 0}
            record={presenter.goal.record.streak_count || 0}
            startDate={presenter.goal.created_at}
        />
        <EntryGallery
            goal={presenter.goal}
        />
    </div>
{:else}
    <p>Could not load goal</p>
{/if}