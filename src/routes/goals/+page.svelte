<script lang="ts">
    import { GoalsPagePresenter } from "$lib/presenters/goals/GoalsPagePresenter.svelte";
    const presenter = GoalsPagePresenter.make();
</script>

<h1>Goals</h1>
<p>User: {JSON.stringify(presenter.user)}</p>
<button onclick={presenter.logout.bind(presenter)}>Log out</button>
