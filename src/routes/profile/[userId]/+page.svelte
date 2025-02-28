<script lang="ts">
	import PageNavHeader from '$lib/components/nav/PageNavHeader.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PageData } from './$types';

    import PencilSolid from '$lib/assets/icons/pencil-solid.svelte';
	import ResponsiveCenterColumn from '$lib/components/ui/ResponsiveCenterColumn.svelte';
	import PagePadding from '$lib/components/ui/PagePadding.svelte';

	const { data }: { data: PageData } = $props();
	const presenter = data.profilePagePresenter;

</script>

{#snippet profileImage()}
	<img class="mt-32 h-32" alt="Profile" src={presenter.displayedProfileImageUrl} />
{/snippet}

<ResponsiveCenterColumn>
	<PagePadding>
		<PageNavHeader title="Profile" />
		<div class="flex flex-col items-center">
			{#if presenter.profile}
				{#if presenter.isCurrentUser}
					<div class="relative group overflow-hidden">
						<label for="profileImageInput" class="cursor-pointer">
							{@render profileImage()}
							<input
								bind:files={presenter.profileImgFiles}
								onchange={presenter.onImageSelected.bind(presenter)}
								id="profileImageInput"
								type="file"
								accept={presenter.mimeFiletypes}
								name="Pick Profile"
								class="hidden"
							/>
						</label>
		
						<div class="opacity-0 group-hover:opacity-100 transition-opacity">
							<div class="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 rotate-45 bg-black opacity-20 w-16 h-16"></div>
							<div class="text-black w-6 absolute right-1 bottom-1"><PencilSolid /></div>
						</div>
					</div>
		
					<div class="{presenter.hasEditedProfileImage ? 'visible' : 'invisible'}">
						<Button disabled={presenter.updatingProfileImage} title="Save" onClick={async () => {
							await presenter.updateProfileImage()
						}} />
					</div>
				{:else}
					{@render profileImage()}
				{/if}
				<h1 class="mt-6 text-2xl">{presenter.profile.email}</h1>
				<Button
					title="Log out"
					onClick={async () => {
						await presenter.logout();
					}}
				/>
			{:else}
				<p>Loading profile...</p>
			{/if}
		</div>
	</PagePadding>
</ResponsiveCenterColumn>
