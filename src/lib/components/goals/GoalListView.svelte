<script lang="ts">
	import type { GoalInfo } from "$lib/model/domain/goals";

    const { goal }: { goal: GoalInfo } = $props();

</script>

<div>
    <p>Goal: {goal.goal.title}</p>
    <p>Streak: {goal.streak?.streakCount}</p>
</div>
