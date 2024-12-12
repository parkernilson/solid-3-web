<script lang="ts">
	import type { GoalInfo } from "$lib/model/goals";

    const { goal }: { goal: GoalInfo } = $props();

</script>

<div>
    <p>Goal: {goal.title}</p>
    <p>Streak: {goal.streak.streak_count}</p>
</div>
