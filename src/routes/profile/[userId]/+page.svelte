<script lang="ts">
	import PageNavHeader from "$lib/components/nav/PageNavHeader.svelte";
	import Button from "$lib/components/ui/Button.svelte";
    import type { PageData } from "./$types";

    const { data }: { data: PageData } = $props();
    const rootLayoutPresenter = data.rootLayoutPresenter;
    
</script>

<PageNavHeader title="Profile" />
<div class="flex flex-col items-center">
    <i class="fa-solid fa-user text-6xl mt-32"></i>
    <h1 class="mt-6 text-2xl">{data.user.email}</h1>
    <Button title="Log out" onClick={async () => {
        await rootLayoutPresenter.logout()
    }} />
</div>