<script lang="ts">
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import type { ISharedGoalPreview } from '$lib/model/domain/goals';
	import type { SharedGoalsModel } from '$lib/model/models/goals/SharedGoalsModel.svelte';
	import { getContext } from 'svelte';
	import ProfilePicture from '../users/ProfilePicture.svelte';

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

<div class="m-2 flex flex-col items-center">
	<div class="flex items-center">
		<div class="w-12 h-12 mr-2">
			<ProfilePicture
				userId={presenter.goalOwnerId}
				profileImagePath={presenter.goalOwnerProfileImagePath}
			/>
		</div>
		<div class="flex-1">
			<p>{presenter.shareMessage}</p>
		</div>
	</div>
	<div class="flex items-center justify-around w-full max-w-[300px]">
		<button
			onclick={async () => {
				await presenter.accept();
			}}
			class="mx-2 text-xl">Accept</button
		>
		<button
			onclick={async () => {
				await presenter.reject();
			}}
			class="mx-2 text-xl">Reject</button
		>
	</div>
</div>
