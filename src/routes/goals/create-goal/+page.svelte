<script lang="ts">
	import FieldInput from '$lib/components/FieldInput.svelte';
import ModalNavHeader from '$lib/components/nav/ModalNavHeader.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ResponsiveCenterColumn from '$lib/components/ui/ResponsiveCenterColumn.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const presenter = data.createGoalModalPresenter;
</script>

<ResponsiveCenterColumn>
	<ModalNavHeader title="Create Goal" />
	<div class="flex-1 flex flex-col items-center">
		<div class="mt-12 text-3xl w-full">
			<FieldInput type="text" placeholder="Title" bind:value={presenter.title} />
		</div>
		<Button title="Create" onClick={presenter.createGoal.bind(presenter)} />
	</div>
</ResponsiveCenterColumn>
