<script lang="ts">
    let { children } = $props();

	let isOpen = $state(false);

	function togglePopover(event: MouseEvent) {
		event.stopPropagation();
		isOpen = !isOpen;
	}

	function handleClickOutside(event: MouseEvent) {
		const popover = (event.target as HTMLElement)?.closest('.popover-container');
		if (!popover) {
			isOpen = false;
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="relative inline-block">
	<button
		class="p-2 hover:bg-blue-light rounded-full transition-colors duration-200"
		aria-label="More options"
		onclick={togglePopover}
	>
        <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
	</button>

	{#if isOpen}
		<div
			class="popover-container absolute right-0 mt-2 w-48 text-dark bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 overflow-hidden"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="options-menu"
		>
			<div class="" role="none">
                {@render children?.()}
			</div>
		</div>
	{/if}
</div>

<svelte:window onclick={handleClickOutside} />
