<script lang="ts">
	import { presenterFactory } from "$lib/factories";
	import type { GoalInfo } from "$lib/model/domain/goals";

    const { goal }: { goal: GoalInfo } = $props();
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
