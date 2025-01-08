<script lang="ts">
	import ModalNavHeader from '$lib/components/nav/ModalNavHeader.svelte';
	import ResponsiveCenterColumn from '$lib/components/ui/ResponsiveCenterColumn.svelte';
	import { VisualViewportInspector } from '$lib/presenters/window/VisualViewportInspector.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const presenter = data.createGoalModalPresenter;
</script>

<ResponsiveCenterColumn>
	<ModalNavHeader title="Create Goal" />
	<div class="flex-1 flex flex-col items-center">
		<input type="text" />
	</div>
</ResponsiveCenterColumn>
