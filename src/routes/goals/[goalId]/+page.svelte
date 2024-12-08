<script lang="ts">
	import { GoalPagePresenter } from "$lib/presenters/goals/GoalPagePresenter.svelte";
    import { page as pageStore } from "$app/stores";
	import { fromStore } from "svelte/store";
	import { onMount } from "svelte";
	import HeaderStats from "$lib/components/goals/HeaderStats.svelte";
	import EntryGallery from "$lib/components/goals/EntryGallery.svelte";
    const page = fromStore(pageStore);

    const presenter = GoalPagePresenter.make();

    onMount(() => { presenter.loadPage(page.current.params.goalId) })

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
            entries={presenter.entries!}
        />
    </div>
{:else}
    <p>Could not load goal</p>
{/if}