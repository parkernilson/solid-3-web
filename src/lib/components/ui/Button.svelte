<script lang="ts">
	const { title, onClick }: { title: string; onClick: () => void | Promise<void> } = $props();
</script>

<button onclick={onClick} class="text-2xl">{title}</button>
