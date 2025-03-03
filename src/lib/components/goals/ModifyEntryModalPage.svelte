<script lang="ts">
    import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
    import { GoalRoutePresenter } from '$lib/presenters/goals/GoalRoutePresenter.svelte';
    import type { ModifyEntryModalMode } from '$lib/presenters/goals/ModifyEntryModalPresenter.svelte';
    import { getContext } from 'svelte';
    import ModalNavHeader from '../nav/ModalNavHeader.svelte';
    import PagePadding from '../ui/PagePadding.svelte';
    import ResponsiveCenterColumn from '../ui/ResponsiveCenterColumn.svelte';

	const { mode, entryId }: { mode: ModifyEntryModalMode, entryId?: string } = $props();

	const presenterFactory = getContext<PresenterFactory>("PresenterFactory");
	const goalRoutePresenter = getContext<GoalRoutePresenter>("GoalRoutePresenter")
	const presenter = presenterFactory.createModifyEntryModalPresenter(goalRoutePresenter, mode, entryId)

</script>

<ResponsiveCenterColumn>
	<PagePadding>
		<ModalNavHeader title={mode === 'create' ? 'Add Entry' : 'Edit Entry'} />
        <div class="">
			<div class="">
						<input type="date" bind:value={presenter.currentDateOf} />
						<input type="checkbox" bind:checked={presenter.currentSuccess} />
			</div>
					<div class="flex flex-col justify-center">
						<input type="text" bind:value={presenter.currentTextContent} />
					</div>
		</div>
	</PagePadding>
</ResponsiveCenterColumn>
