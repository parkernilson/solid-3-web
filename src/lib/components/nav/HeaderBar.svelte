<script lang="ts">
	import SolidLogo from '$lib/assets/solid-logo.svg';
	import type { UserProfile } from '$lib/model/domain/users';

	const { user }: { user: UserProfile } = $props();
</script>

<div class="w-full flex items-center justify-between py-3">
	<div class="flex items-center">
		<img src={SolidLogo} alt="Solid Logo" class="h-8 sm:h-8 inline mr-1" />
		<span class="font-logo font-bold text-3xl">SOLID</span>
	</div>
	<a aria-label="Go to profile" href="/profile/{user.id}"
		><i class="fa-solid fa-user text-2xl"></i></a
	>
</div>
