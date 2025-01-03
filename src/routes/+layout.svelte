<script lang="ts">
	import DialogProvider from '$lib/components/DialogProvider.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="h-full">
	{@render children()}
</div>

<DialogProvider />
