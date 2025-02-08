<script lang="ts">
	import { PresenterFactory } from "$lib/factories/presenters/PresenterFactory.svelte";
	import type { IGoalInfo, ISharedGoal } from "$lib/model/domain/goals";
	import { getContext } from "svelte";

    const { goal }: { goal: IGoalInfo | ISharedGoal } = $props();
    const presenterFactory = getContext<PresenterFactory>("PresenterFactory")
    const presenter = presenterFactory.createGoalListViewPresenter(goal)   

</script>

<a href="{presenter.goalPageUrl}">
    <div class="flex justify-between items-center mt-4 box-border">
        <div class="flex items-center">
            {#if presenter.isSharedGoal} 
                <div class="h-full flex items-center align-center">
                    <img class="w-12 h-12 aspect-square rounded-full mr-2 object-cover" alt="Profile of {presenter.sharedBy}" src={presenter.goalOwnerProfileImageUrl} />
                </div>
            {/if}
            <div class="flex-1 flex flex-col">
                <p class="text-2xl">{presenter.title}</p>
                <p class="text-sm">{presenter.sharedBy ? `${presenter.sharedBy} - ` : ''}{presenter.lastActivityMessage}</p>
            </div>
        </div>
        <div class="">
            <p class="text-3xl">{presenter.streakString}</p>
        </div>
    </div>
</a>
