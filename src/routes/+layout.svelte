<script lang="ts">
	import { goto } from '$app/navigation';
	import DialogProvider from '$lib/components/DialogProvider.svelte';
	import { presenterFactory } from '$lib/factories';
	import '../app.css';

	let { children } = $props();

	const presenter = presenterFactory.createRootLayoutPresenter();
	
	$effect(() => {
		if (!presenter.user) goto('/');
	})

</script>

{@render children()}

<DialogProvider />