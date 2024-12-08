<script lang="ts">
	import { GoalPagePresenter } from "$lib/presenters/goals/GoalPagePresenter.svelte";
    import { page as pageStore } from "$app/stores";
	import { fromStore } from "svelte/store";
	import { onMount } from "svelte";
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
        <div class="flex">
            <div class="flex-1 flex flex-col items-center">
                <p>{presenter.goal.streak.streak_count}</p>
                <p>Streak</p>
            </div>
            <div>|</div>
            <div class="flex-1 flex flex-col items-center">
                <!-- TODO: Implement longest streak -->
                <p>?</p>
                <p>Record</p>
            </div>
            <div>|</div>
            <div class="flex-1 flex flex-col items-center">
                <p>{presenter.formattedStartDate}</p>
                <p>Started</p>
            </div>
        </div>
    </div>
{:else}
    <p>Could not load goal</p>
{/if}