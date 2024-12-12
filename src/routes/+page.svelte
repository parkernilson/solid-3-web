<script lang="ts">
	import { goto } from "$app/navigation";
	import { presenterFactory } from "$lib/factories";

    const presenter = presenterFactory.createLoginPresenter();

    $effect(() => {
        if (presenter.user) {
            goto("/goals");
        }
    })

</script>

<h1>Solid App</h1>
<input placeholder="email" bind:value={presenter.email} />
<input placeholder="password" bind:value={presenter.password} />
<input type="submit" onclick={presenter.login.bind(presenter)} value="Login" />
