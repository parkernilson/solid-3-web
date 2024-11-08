<script lang="ts">
	import { goto } from '$app/navigation';
	import { RootLayoutPresenter } from '$lib/presenters/root/RootLayoutPresenter.svelte';
	import '../app.css';

	let { children } = $props();

	const presenter = RootLayoutPresenter.make();
	
	$effect(() => {
		if (!presenter.user) goto('/');
	})

</script>

<p>Current User: {presenter.user?.email ?? "Not logged in"}</p>
<button onclick={presenter.logout.bind(presenter)}>Logout</button>
{@render children()}