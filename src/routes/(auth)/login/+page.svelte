<script lang="ts">
	import LoginRegisterPage from "$lib/components/auth/LoginRegisterPage.svelte";
	import type { PageData } from "./$types";
    const { data }: { data: PageData } = $props();
    const presenter = data.loginPresenter

</script>

<LoginRegisterPage type="login" loginPresenter={presenter} />