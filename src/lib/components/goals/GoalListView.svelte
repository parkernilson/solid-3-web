<script lang="ts">
	import { PresenterFactory } from "$lib/factories/presenters/PresenterFactory.svelte";
	import type { IGoalInfo } from "$lib/model/domain/goals";
	import { getContext } from "svelte";

    const { goal }: { goal: IGoalInfo } = $props();
    const presenterFactory = getContext<PresenterFactory>("PresenterFactory")
    const presenter = presenterFactory.createGoalListViewPresenter(goal)   

</script>

<div class="flex justify-between items-center mt-4">
    <div class="flex flex-col">
        <p class="text-2xl">{presenter.title}</p>
        <p class="text-sm">{presenter.lastActivityMessage}</p>
    </div>
    <div class="">
        <p class="text-3xl">{presenter.streakString}</p>
    </div>
</div>
