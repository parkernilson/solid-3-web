<script lang="ts">
	import { presenterFactory } from "$lib/factories";
	import type { Goal } from "$lib/model/domain/goals";
	import { onMount } from "svelte";
	import InfiniteScrollingContainer from "./InfiniteScrollingContainer.svelte";

    const { goal }: { goal: Goal } = $props();

    const presenter = presenterFactory.createShareGoalDialogPresenter(goal);

    onMount(async () => {
        await presenter.load({ goalId: goal.id });
    })

</script>

<div>
    <input placeholder="Email" />
    <InfiniteScrollingContainer
        loadMoreItems={presenter.loadMoreUsers.bind(presenter)}
        hasMore={presenter.hasMoreUsers}
        loading={presenter.loadingMoreUsers}
    >
        {#if presenter.displayedUsers}
            {#each presenter.displayedUsers as user}
                <div class="px-3 py-1">
                    <button>{user.email}</button>
                </div>
            {/each}
        {/if}
    </InfiniteScrollingContainer>
</div>