<script lang="ts">
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import type { ISharedGoalPreview } from '$lib/model/domain/goals';
	import type { SharedGoalsModel } from '$lib/model/models/goals/SharedGoalsModel.svelte';
	import { getContext } from 'svelte';

	const {
		sharedGoalPreview,
		sharedGoalsModel
	}: {
		sharedGoalPreview: ISharedGoalPreview;
		sharedGoalsModel: SharedGoalsModel;
	} = $props();

	const presenterFactory = getContext<PresenterFactory>('PresenterFactory');
	const presenter = presenterFactory.createShareRequestListViewPresenter(
		sharedGoalsModel,
		sharedGoalPreview
	);
</script>

<div>
    <h1>{presenter.goalTitle}</h1>
    <p>{presenter.goalOwnerEmail}</p>
    <button
        onclick={async () => { await presenter.accept(); }}
        class="block mx-2">Accept</button
    >
    <button
        onclick={async () => { await presenter.reject(); }}
        class="block mx-2">Reject</button
    >
</div>