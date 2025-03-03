<script lang="ts">
	const {
		title
	}: {
		title: string;
	} = $props();

	const goBack = () => {
		window.history.back();
	};
</script>

<div class="flex items-center justify-between my-3">
	<h1 class="text-2xl">{title}</h1>
	<button aria-label="Cancel" onclick={goBack}>
		<i class="fa-solid fa-x fa-lg"></i>
	</button>
</div>
