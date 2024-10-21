<script lang="ts">
	import { goto } from '$app/navigation';
	import { RootLayoutPresenter } from '$lib/presenters/root/AuthPresenter.svelte';
	import '../app.css';

	let { children } = $props();

	const presenter = RootLayoutPresenter.make();

	$effect(() => {
		presenter.load();
	})
	
	$effect(() => {
		if (!presenter.user) goto('/');
	})

</script>

{@render children()}