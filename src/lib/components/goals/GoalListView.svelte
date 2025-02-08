<script lang="ts">
	import { PresenterFactory } from "$lib/factories/presenters/PresenterFactory.svelte";
	import type { IGoalInfo, ISharedGoal } from "$lib/model/domain/goals";
	import { getContext } from "svelte";
	import ProfilePicture from "../users/ProfilePicture.svelte";

    const { goal }: { goal: IGoalInfo | ISharedGoal } = $props();
    const presenterFactory = getContext<PresenterFactory>("PresenterFactory")
    const presenter = presenterFactory.createGoalListViewPresenter(goal)   

</script>

<a href="{presenter.goalPageUrl}">
    <div class="flex justify-between items-center mt-4 box-border">
        <div class="flex items-center">
            {#if presenter.isSharedGoal} 
                <div class="h-full flex items-center align-center">
                    <div class="w-12 h-12 mr-2">
                        <ProfilePicture userId={presenter.goalOwnerId!} profileImagePath={presenter.ownerProfileImagePath} />
                    </div>
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
