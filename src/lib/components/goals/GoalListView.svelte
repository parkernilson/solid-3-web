<script lang="ts">
	import type { GoalWithStreak } from "$lib/model/goals";

    const { goal }: { goal: GoalWithStreak } = $props();

</script>

<div>
    <p>Goal: {goal.title}</p>
    <p>Streak: {goal.streak.streak_count}</p>
</div>
