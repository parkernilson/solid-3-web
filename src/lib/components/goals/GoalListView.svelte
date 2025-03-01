<script lang="ts">
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import type { GoalInfoDataModel } from '$lib/model/models/goals/GoalInfoDataModel.svelte';
	import type { SharedGoalInfoDataModel } from '$lib/model/models/goals/SharedGoalInfoDataModel.svelte';
	import { getContext } from 'svelte';
	import ProfilePicture from '../users/ProfilePicture.svelte';
	import type { IGoalInfo } from '$lib/model/domain/goals';

	const {
		goalInfo,
		goalInfoModel
	}: { goalInfo: IGoalInfo; goalInfoModel: GoalInfoDataModel | SharedGoalInfoDataModel } = $props();
	const presenterFactory = getContext<PresenterFactory>('PresenterFactory');
	const presenter = presenterFactory.createGoalListViewPresenter(goalInfo, goalInfoModel);
</script>

{#snippet body()}
	<div class="flex justify-between items-center mt-4 box-border">
		<div class="flex items-center">
			{#if presenter.isSharedGoal}
				<div class="h-full flex items-center align-center">
					<div class="w-12 h-12 mr-2">
						<ProfilePicture
							userId={presenter.goalOwnerId!}
							profileImagePath={presenter.ownerProfileImagePath}
						/>
					</div>
				</div>
			{/if}
			<div class="flex-1 flex flex-col">
				<p class="text-2xl">{presenter.title}</p>
				<p class="text-sm">
					{presenter.sharedBy ? `${presenter.sharedBy} - ` : ''}{presenter.lastActivityMessage}
				</p>
			</div>
		</div>
		<div class="">
			<p class="text-3xl">{presenter.streakString}</p>
		</div>
	</div>
{/snippet}

{#if presenter.optimistic}
	<p>Optimistic</p>
	{@render body()}
{:else}
	<a href={presenter.goalPageUrl}>
		{@render body()}
	</a>
{/if}
