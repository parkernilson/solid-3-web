<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		title,
		actions
	}: {
		title: string;
		actions?: Snippet;
	} = $props();

	const goBack = () => {
		window.history.back();
	};
</script>

<div class="flex items-center justify-between my-3">
	<h1 class="text-2xl">{title}</h1>
	<div class="flex">
		{@render actions?.()}
		<button aria-label="Cancel" onclick={goBack}>
			<i class="fa-solid fa-x fa-lg"></i>
		</button>
	</div>
</div>
