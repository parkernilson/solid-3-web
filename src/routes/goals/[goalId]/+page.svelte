<script lang="ts">
	import { GoalPagePresenter } from "$lib/presenters/goals/GoalPagePresenter";

    const presenter = GoalPagePresenter.create();
    const { goal } = presenter;

</script>

<h1>{goal.title}</h1>