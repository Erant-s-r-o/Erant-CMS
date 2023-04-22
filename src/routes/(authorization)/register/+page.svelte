<script lang="ts">
	import { account, user } from '$lib/appwrite';
	import Loading from '$lib/components/Common/Loading.svelte';
	import HiddenInput from '$lib/components/Inputs/Hidden_Input.svelte';
	import GoogleLogo from '$lib/svg/GoogleLogo.svelte';
	import TopImage from '$lib/svg/Top-Image.svelte';
	import { getErrorMessage } from '../utils/authorizationErrors';
	import { getUserByErantId } from '$lib/utils/database/users';
	import { AppwriteException, ID } from 'appwrite';
	import { Checkbox, Helper } from 'flowbite-svelte';
	import Button from '$lib/components/Buttons/Button.svelte';
	import SocialLogin from '../Components/SocialLogin.svelte';
	import Input from '$lib/components/Inputs/Input.svelte';
	import EmailSent from '../Components/EmailSent.svelte';
	import { browser } from '$app/environment';

	let email = '';
	let password = '';
	let repeatPassword = '';
	let name = '';
	let erantId = '';
	let termsChecked: boolean = false;

	let state: 'email-sent' | 'register' | 'loading' = 'register';
	let error: string | null = null;
	$: buttonCodition =
		name.length > 0 &&
		email.length > 0 &&
		password.length >= 8 &&
		password === repeatPassword &&
		erantId.length > 2 &&
		termsChecked &&
		nicknameIsValid;

	const pattern = /^[a-zA-Z0-9+@]+$/;
	$: nicknameIsValid = pattern.test(erantId);

	const register = async () => {
		//if (password === repeatPassword || name.length < 8 || email.length < 8) throw new Error('conditions are not fine')
		try {
			await user.deleteSessions();
		} catch (error) {}
		try {
			state = 'loading';
			error = null;
			if (await getUserByErantId(erantId)) {
				const err = new Error('Erant ID is already taken');
				err['code'] = 1001;
				throw err;
			}

			await user.create(ID.unique(), email, password, name);
			await user.createEmailSession(email, password);
			await user.createVerification(
				`${browser ? location.origin : 'erant.cz'}/register/emailverification/${erantId}`
			);
			state = 'email-sent';
		} catch (err) {
			console.log(err);
			if (err instanceof AppwriteException) error = getErrorMessage(err.code);

			state = 'register';
		}
	};
</script>

{#if state !== 'email-sent'}
	<div class="main">
		<div class="top-image">
			<TopImage />
		</div>

		<h1 class="headline">Register</h1>

		<div class="form">
			{#if error}
				<Helper class="ml-4" color="red">{error}</Helper>
			{/if}
			<div class="inform">
				<Input
					bind:value={name}
					placeholder="Your name"
					autocomplete="full-name"
					class="p-3 border-1 rounded-[15px] bg-[#eeeeee] text-lg w-full"
				/>
				<Input
					bind:value={email}
					placeholder="Your e-mail"
					autocomplete="email"
					class="p-3 border-1 rounded-[15px] bg-[#eeeeee] text-lg w-full"
				/>
				<div class="w-full">
					<Input
						bind:value={erantId}
						placeholder="@your_nickname"
						class="p-3 border-1 rounded-[15px] bg-[#eeeeee] text-lg w-full"
						prefix="@"
					/>
					{#if !nicknameIsValid}
						<Helper class="flex justify-start w-full pl-4" color="red"
							>Your nickname can include only a-zA-Z0-9 characters</Helper
						>
					{/if}
				</div>
				<HiddenInput bind:value={password} placeholder="Password" />
				<div class="w-full">
					<HiddenInput bind:value={repeatPassword} placeholder="Re-type password" />
					{#if password !== repeatPassword && password.length >= 8}
						<Helper
							class="flex justify-start w-full pl-4"
							helperClass="text-sm"
							color="red">Passwords are not equal</Helper
						>
					{/if}
				</div>

				<div class="flex items-center">
					<Checkbox
						bind:checked={termsChecked}
						class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label
						for="link-checkbox"
						class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>I agree with the <a
							href="erant.cz/terms-and-conditions"
							class="text-blue-600 dark:text-blue-500 hover:underline"
							>terms and conditions</a
						>,
						<a
							href="erant.cz/privacy-policy"
							class="text-blue-600 dark:text-blue-500 hover:underline"
							>privacy policy</a
						>
						and
						<a
							href="erant.cz/cookie-policy"
							class="text-blue-600 dark:text-blue-500 hover:underline"
							>Cookie Policy</a
						>, which this site uses.</label
					>
				</div>
				<Button
					class="w-full text-2xl"
					primary
					disabled={!buttonCodition}
					on:click={() => register()}
				>
					{#if state === 'loading'}
						<Loading class="text-white" />
					{:else}
						Sign up
					{/if}
				</Button>
			</div>
		</div>

		<SocialLogin />

		<div class="LR_switch">
			<p>Already have an account? <a href="/login">Log In</a></p>
		</div>
	</div>
{:else}
	<EmailSent />
{/if}

<style lang="scss">
	$gap: 20px;

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
