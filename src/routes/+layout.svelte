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

<div class="flex justify-between p-2">
	<p>User: {presenter.user?.id ?? "undefined"}</p>
	<button class="hover:text-blue-600" onclick={presenter.logout.bind(presenter)}>Log out</button>
</div>
{@render children()}

<DialogProvider />