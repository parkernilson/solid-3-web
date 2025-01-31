<script lang="ts">
	import { PresenterFactory } from "$lib/factories/presenters/PresenterFactory.svelte";
	import type { IGoalInfo, ISharedGoal } from "$lib/model/domain/goals";
	import { getContext } from "svelte";

    const { goal }: { goal: IGoalInfo | ISharedGoal } = $props();
    const presenterFactory = getContext<PresenterFactory>("PresenterFactory")
    const presenter = presenterFactory.createGoalListViewPresenter(goal)   

</script>

<div class="flex justify-between items-center mt-4">
    <div class="flex flex-col">
        <p class="text-2xl">{presenter.title}</p>
        <p class="text-sm">{presenter.lastActivityMessage}</p>
        <!-- TODO: finish implementing this -->
        {#if presenter.sharedBy}
            <p>{presenter.sharedBy}</p>
        {/if}
    </div>
    <div class="">
        <p class="text-3xl">{presenter.streakString}</p>
    </div>
</div>
