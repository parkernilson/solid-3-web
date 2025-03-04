<script lang="ts">
	import SolidLogo from '$lib/assets/solid-logo.svg';
	import type { LayoutData } from './$types';
	const { children, data }: { children?: Function; data: LayoutData } = $props();
	const loginPresenter = data.loginPresenter;
</script>

<div class="h-full flex flex-col">
	<!-- svelte-ignore a11y_missing_attribute -->
	<div class="flex flex-col justify-center py-24 md:py-32 px-4">
		<img class="h-24 mb-2" src={SolidLogo} />
		<h1 class="text-center text-6xl font-logo font-bold">SOLID</h1>
	</div>
	<div class="flex-1">
		{@render children?.()}
	</div>
	<div class="flex justify-center items-center p-1">
		<p class="mr-4">Parker Nilson © 2024</p>
		<a aria-label="Parker Nilson Github Profile" href="https://github.com/parkernilson"
			><i class="fa-brands fa-github mr-2"></i></a
		>
		<a
			aria-label="Parker Nilson Linked In Profile"
			href="https://www.linkedin.com/in/parker-nilson/"><i class="fa-brands fa-linkedin"></i></a
		>
	</div>
</div>
