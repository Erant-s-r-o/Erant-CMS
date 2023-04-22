<script lang="ts">
	import { account } from '$lib/appwrite'
	import Button from '$lib/components/Buttons/Button.svelte'
	import Loading from '$lib/components/Common/Loading.svelte'
	import { navigate } from 'svelte-routing'
	import TopImage from '$lib/svg/Top-Image.svelte'
	import { Alert, Helper } from 'flowbite-svelte'

	let email = ''
	let state: 'basic' | 'loading' = 'basic'
	let error: string | null = null

	const sendRecoveryEmail = async () => {
		state = 'loading'
		error = null
		try {
			await account.createRecovery(email, `${location.origin}/reset-password`)
			navigate('/reset-password-sent')
		} catch (err) {
			error = JSON.parse(JSON.stringify(err)).response.message
			state = 'basic'
		}
	}
</script>

<div class="main">
	<!--Top image static link form lib/svg-->
	<div class="top-image">
		<TopImage />
	</div>

	<!--Forgot password form-->
	<h1 class="headline">Forgot Password</h1>
	<div class="form">
		{#if error}
			<Helper color="red">{error}</Helper>
		{/if}
		<div class="inform">
			<input bind:value={email} type="text" placeholder="E-mail" autocomplete="email" required />
			<button class="loginButton" on:click={() => sendRecoveryEmail()}>
				{#if state === 'loading'}
					<Loading class="text-white" />
				{:else}
					Send Email
				{/if}
			</button>
		</div>
	</div>
</div>
