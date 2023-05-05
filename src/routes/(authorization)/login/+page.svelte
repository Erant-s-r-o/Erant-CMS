<script lang="ts">
	import Loading from '$lib/components/Common/Loading.svelte';
	import HiddenInput from '$lib/components/Inputs/Hidden_Input.svelte';
	import GoogleLogo from '$lib/svg/GoogleLogo.svelte';
	import TopImage from '$lib/svg/Top-Image.svelte';
	import { Helper } from 'flowbite-svelte';
	import { getErrorMessage } from '../utils/authorizationErrors';
	import Button from '$lib/components/Buttons/Button.svelte';
	import { browser } from '$app/environment';
	import cookie from '$lib/utils/cookie';
	import { erant, user } from '$lib/appwrite';
	import { goto } from '$app/navigation';

	export let purpose = 'login'; //possible values login, register

	let email = '';
	let password = '';

	let state: 'loading' | 'basic' = 'basic';
	let error: string | null = null;

	const emailLogin = async () => {
		state = 'loading';
		error = null;
		try {
			await user.deleteSessions();
		} catch (error) {}
		try {
			await erant.createEmailSession(email, password);
			//if (navigation.canGoBack) navigation.back()
			goto('/');
		} catch (err) {
			//if (err instanceof AppwriteException) error = getErrorMessage(err.code);
			state = 'basic';
		}
	};
</script>

<div class="main">
	<!--Top image static link form lib/svg-->
	<div class="top-image">
		<TopImage />
	</div>

	<!--Welcome sign 2 options for Log in and for register-->
	<h1 class="headline">
		{#if purpose === 'login'}
			Welcome Back
		{:else}
			Register
		{/if}
	</h1>

	<!--2 forms from components-->
	<div class="form">
		{#if error}
			<Helper class="ml-4" color="red">{error}</Helper>
		{/if}
		<div class="inform">
			<input
				bind:value={email}
				type="text"
				placeholder="E-mail"
				autocomplete="email"
				required
			/>
			<HiddenInput bind:value={password} placeholder="Password" />
			<div class="forgot_password">
				<a href="/forgot-password">Forgot password?</a>
			</div>
			<Button
				class="w-full text-2xl"
				primary
				disabled={password.length < 8}
				on:click={() => emailLogin()}
			>
				{#if state === 'loading'}
					<Loading class="text-white" />
				{:else}
					Log in
				{/if}
			</Button>
		</div>
	</div>

	<div class="LR_switch">
		<!--LR switch = login / register switch-->
		{#if purpose === 'login'}
			<p>Don’t have an account? <a href="/register">Sign-up</a></p>
		{:else}
			<p>Already have an account? <a href="/login">Log In</a></p>
		{/if}
	</div>
</div>

<style lang="scss">
	$gap: 20px;
	.forgot_password {
		display: flex;
		justify-content: space-between;
		align-items: center;
		a {
			font-family: 'Source Sans Pro';
			font-style: normal;
			font-weight: 600;
			font-size: 20px;
			line-height: 18px;
			color: #4263eb;
		}
	}
	.main {
		width: 100%;
		max-height: 100vh;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: $gap;
		padding: 30px 0 0 0;

		@media screen and (max-height: 990px) {
			gap: 2vh;
		}

		.top-image {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.headline {
			text-align: center;
			font-family: 'Source Sans Pro';
			font-style: normal;
			font-weight: 600;
			font-size: 40px;
			margin: 0px;

			@media screen and (max-height: 750px) {
				font-size: 5.3vh;
			}
		}

		.continue_with {
			width: calc(100% - 48px);
			margin: 0 auto 0 auto;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 20px;

			@media screen and (max-width: 410px) {
				width: calc(100% - 24px);
			}

			button {
				height: 60px;
				width: 100%;

				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				gap: 16px;

				background-color: #fff;
				border-radius: 10px;
				box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);

				@media screen and (max-width: 410px) {
					gap: 3.5vw;
				}
				p {
					font-family: 'Source Sans Pro';
					font-style: normal;
					font-weight: 600;
					font-size: 28px;
					line-height: 36px;
					color: rgba(0, 0, 0, 0.54);

					@media screen and (max-width: 400px) {
						font-size: 7.3vw;
					}
				}
			}
			button:hover {
				opacity: 70%;
			}
		}

		.form {
			width: calc(100% - 48px);
			position: relative;
			margin: 0 auto 0 auto;

			@media screen and (max-width: 410px) {
				width: calc(100% - 24px);
			}

			.inform {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: $gap;

				@media screen and (max-height: 990px) {
					gap: 2vh;
				}

				width: 100%;
				position: relative;

				input[type='text'] {
					width: calc(100%);
					padding: 12px 24px;
					border-radius: 15px;
					background-color: #eeeeee;
					font-size: 18px;
					font-family: 'Source Sans Pro';
					font-style: normal;
					font-weight: 600;
					line-height: 28px;
					@media screen and (max-height: 720px) {
						padding: 8px 24px;
					}
				}
				::placeholder {
					color: #8f8f8f;
					font-size: 18px;
					font-family: 'Source Sans Pro';
					font-style: normal;
					font-weight: 600;
					line-height: 28px;
				}

				.loginButton {
					background-color: #4263eb;
					color: white;

					width: 100%;

					font-family: 'Source Sans Pro';
					font-style: normal;
					font-weight: 600;
					font-size: 32px;
					line-height: 40px;
					padding: 12px 0px;
					border-radius: 15px;

					@media screen and (max-height: 820px) {
						font-size: 3.9vh;
						line-height: 4.8vh;
						padding: 1.4vh 0px;
					}
				}
			}
		}

		.LR_switch {
			width: calc(100% - 48px);
			padding-bottom: 30px;

			text-align: center;
			font-family: 'Source Sans Pro';
			font-style: normal;
			font-weight: 600;
			font-size: 24px;
			letter-spacing: 0.5px;
			color: rgba(0, 0, 0, 0.4);
			@media screen and (max-width: 410px) {
				width: calc(100% - 24px);
				font-size: 5.8vw;
			}

			@media screen and (max-width: 320px) {
				font-size: 18px;
			}
			a {
				color: #4263eb;
			}
			a:hover {
				opacity: 50%;
			}
		}
	}
</style>
