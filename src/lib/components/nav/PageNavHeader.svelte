<script lang="ts">
	interface PageNavHeaderOption {
		name: string;
	}

    // TODO: make the back location smarter (i.e. where did I navigate from?)

	const {
		title,
		backLocation,
		options
	}: { title: string; backLocation?: string; options?: PageNavHeaderOption[] } = $props();
</script>

<div class="flex items-center m-3 relative">
	{#if backLocation}
		<a href={backLocation} aria-label="Go back" class="absolute left-0">
            <i class="fa-solid fa-chevron-left fa-lg"></i>
		</a>
	{/if}
	<div class="flex-1 flex justify-center">
		<h1 class="text-2xl">{title}</h1>
	</div>
    {#if options}
        <i class="fa-solid fa-ellipsis-vertical fa-xl"></i>
    {/if}
</div>
