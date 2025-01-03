<script lang="ts">
	import { goto } from '$app/navigation';
	import type { LayoutData } from './$types';

	const { children, data }: { children?: Function, data: LayoutData } = $props();
	const rootLayoutPresenter = data.rootLayoutPresenter;

	$effect(() => {
		if (!rootLayoutPresenter.user) goto('/login');
	});
</script>

{@render children?.()}

