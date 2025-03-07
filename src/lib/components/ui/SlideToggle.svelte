<script lang="ts">
	import { elasticInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	let { disabled = false, checked = $bindable() }: { disabled?: boolean; checked: boolean } =
		$props();

	const onEnter = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			onClick();
		}
	};

	const onClick = () => {
		if (!disabled) checked = !checked;
	};
</script>

<div
	role="switch"
	tabindex="0"
	aria-checked={checked}
	aria-disabled={disabled}
	aria-label="Toggle success status of entry"
	onkeydown={onEnter}
	onclick={onClick}
	class="w-10 h-6 bg-accent rounded-full"
>
	<div
		class="{checked
			? 'ml-4'
			: ''} transition-all h-6 aspect-square rounded-full bg-accent-foreground flex justify-center items-center"
	>
		{#if checked}
			<i in:fade={{ duration: 100 }} class="fa-solid fa-check text-accent"></i>
		{:else}
			<i in:fade={{ duration: 100 }} class="fa-solid fa-xmark text-accent"></i>
		{/if}
	</div>
</div>
