<script lang="ts">
	let {
		value = $bindable(),
		placeholder,
		type
	}: {
		value?: string;
		placeholder?: string;
		type: 'text' | 'password';
	} = $props();

	let showPassword = $state(false);
</script>

<div class="w-full relative mb-4">
	<input
		class="py-1 w-full outline-none bg-transparent placeholder:text-slate-100 border-b border-white"
		type={showPassword || type !== 'password' ? 'text' : 'password'}
		{placeholder}
		bind:value
	/>
	<!-- svelte-ignore a11y_consider_explicit_label -->
	{#if type === 'password'}
		<button
			aria-label={showPassword ? 'Hide password' : 'Show password'}
			onclick={() => (showPassword = !showPassword)}
			class="absolute right-0"
			><i class="fa-solid {showPassword ? 'fa-eye-slash' : 'fa-eye'}"></i></button
		>
	{/if}
</div>
