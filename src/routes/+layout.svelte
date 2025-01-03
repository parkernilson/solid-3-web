<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import DialogProvider from '$lib/components/DialogProvider.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	let { children, data }: { children?: Function, data: LayoutData } = $props();

	$effect(() => {
		const routeId = $page.route.id
		if (!data.rootLayoutPresenter.user && $page.route.id !== "/(auth)/register") {
			goto("/login")
		}
	})

</script>

<div class="h-full">
	{@render children?.()}
</div>

<DialogProvider />
