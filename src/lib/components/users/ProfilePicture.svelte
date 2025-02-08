<script lang="ts">
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import { getContext } from 'svelte';

	const {
		userId,
		profileImagePath
	}: {
		userId: string;
		profileImagePath?: string;
	} = $props();

	const presenterFactory = getContext<PresenterFactory>('PresenterFactory');
	const presenter = presenterFactory.createProfilePicturePresenter(userId, profileImagePath);
</script>

<!-- TODO: Add a better alt tag here once we add user name -->
<img
	class="aspect-square rounded-full object-cover"
	alt="Profile of {presenter.userId}"
	src={presenter.profileImageUrl}
/>
