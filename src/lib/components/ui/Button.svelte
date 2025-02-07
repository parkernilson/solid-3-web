<script lang="ts">
	const { title, onClick, disabled }: { title: string; onClick: () => void | Promise<void>; disabled?: boolean; } = $props();
</script>

<!-- TODO: add accesibility labels to buttons -->
<button disabled={disabled} onclick={onClick} class="text-2xl">{title}</button>
