<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const rootLayoutPresenter = data.rootLayoutPresenter;

	// $effect(() => {
	// TODO: This causes a brief blip on the home screen before navigating to the right place.
	// if (rootLayoutPresenter.user) {
	// 	goto('/goals');
	// } else {
	// 	goto('/login');
	// }
	// });
</script>
