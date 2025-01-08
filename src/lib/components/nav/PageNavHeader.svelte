<script lang="ts">
	interface PageNavHeaderOption {
		name: string;
	}

	const {
		title,
		options
	}: { title: string; options?: PageNavHeaderOption[] } = $props();

	const goBack = () => {
		window.history.back()
	}
</script>

<div class="flex items-center m-3 relative">
	<button aria-label="Go back" class="absolute left-0" onclick={goBack}>
		<i class="fa-solid fa-chevron-left fa-lg"></i>
	</button>
	<div class="flex-1 flex justify-center">
		<h1 class="text-2xl">{title}</h1>
	</div>
    {#if options}
        <i class="fa-solid fa-ellipsis-vertical fa-xl"></i>
    {/if}
</div>
