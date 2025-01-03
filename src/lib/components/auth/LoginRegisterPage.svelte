<script lang="ts">
	import type { LoginPresenter } from '$lib/presenters/auth/LoginPresenter.svelte';
	import FieldInput from '../FieldInput.svelte';

	const {
		type,
		loginPresenter
	}: {
		type: 'login' | 'register';
		loginPresenter: LoginPresenter;
	} = $props();

</script>

<div class="flex flex-col px-3 items-center">
	<div class="flex flex-col items-center w-full sm:w-96 text-xl">
		<FieldInput type="text" placeholder="Email" bind:value={loginPresenter.email} />
		<FieldInput type="password" placeholder="Password" bind:value={loginPresenter.password} />
	</div>
	<button
		class="text-3xl mt-10 mb-4"
		aria-label={type}
		onclick={async () => {
			if (type === 'login') {
				await loginPresenter.login();
			} else if (type === 'register') {
				await loginPresenter.register();
			}
		}}
	>{type === "login" ? "Login" : "Register"}</button>
	{#if type === "login"}
		<p>Need an account? <a href="/register" aria-label="register">Click here to register</a></p>
	{:else if type === "register"}
		<p>Already have an account? <a href="/login" aria-label="login">Click here to login</a></p>
	{/if}
</div>
