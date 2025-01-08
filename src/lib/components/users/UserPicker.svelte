<script lang="ts">
	import type { UserProfile } from "$lib/model/domain/users";
	import type { UserSelectAction } from "$lib/presenters/users/UserPickerPresenter.svelte";
	import { getContext } from "svelte";
	import InfiniteScrollingContainer from "../InfiniteScrollingContainer.svelte";
	import { PresenterFactory } from "$lib/factories/presenters/PresenterFactory.svelte";

    const {
        initialSelectedUsers,
        beforeSelect,
        onSelect,
        beforeDeselect,
        onDeselect,
        excludeSelf 
    }: {
        initialSelectedUsers?: UserProfile[],
        beforeSelect?: UserSelectAction,
        onSelect?: UserSelectAction,
        beforeDeselect?: UserSelectAction,
        onDeselect?: UserSelectAction,
        excludeSelf: boolean
    } = $props();

    const presenterFactory = getContext<PresenterFactory>("PresenterFactory")
    const presenter = presenterFactory.createUserPickerPresenter(
        excludeSelf,
        initialSelectedUsers,
        beforeSelect,
        onSelect,
        beforeDeselect,
        onDeselect,
    );

    let searchTerm = $state<string>();
    $effect(() => {
        presenter.resetSearchTermDebounced(searchTerm)
    });

</script>

<div>
    <div class="flex">
        {#if presenter.selectedUsers}
            {#each presenter.selectedUsers as user}
                <div class="px-3 py-1">
                    <button onclick={async () => await presenter.handleSelectAction('deselect', user)}>{user.email}</button>
                </div>
            {/each}
        {/if}
    </div>
    <input bind:value={searchTerm} placeholder="Email" />
    <InfiniteScrollingContainer
        loadMoreItems={presenter.loadMoreUsers.bind(presenter)}
        hasMore={presenter.hasMoreUsers}
        loading={presenter.loadingMoreUsers}
    >
        {#if presenter.displayedUsers}
            {#each presenter.displayedUsers as user}
                <div class="px-3 py-1">
                    <button onclick={async () => await presenter.handleSelectAction('select', user)}>{user.email}</button>
                </div>
            {/each}
        {/if}
    </InfiniteScrollingContainer>
</div>