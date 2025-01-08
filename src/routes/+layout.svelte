<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import DialogProvider from '$lib/components/DialogProvider.svelte';
	import { setContext } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';

	let { children, data }: { children?: Function; data: LayoutData } = $props();

	setContext<PresenterFactory>("PresenterFactory", data.presenterFactory);

	$effect(() => {
		const routeId = $page.route.id;
		if (!data.rootLayoutPresenter.user && $page.route.id !== '/(auth)/register') {
			goto('/login');
		}
	});
</script>

<div class="h-full">
	{@render children?.()}
</div>

<DialogProvider />
