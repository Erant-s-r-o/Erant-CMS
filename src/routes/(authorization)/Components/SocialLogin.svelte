<script lang="ts">
	import { browser } from '$app/environment';
	import { account, user } from '$lib/appwrite';
	import GoogleLogo from '$lib/svg/GoogleLogo.svelte';

	const urlFail = `${browser ? location.origin : 'erant.cz'}/register/failed`;
	const urlSuccess = `${browser ? location.origin : 'erant.cz'}/create/account`;

	const login = async (platform: 'facebook' | 'google') => {
		try {
			await user.deleteSessions();
		} catch (error) {}
		user.createOAuth2Session(platform, urlSuccess, urlFail);
	};
</script>

<div class="continue_with">
	<button>
		<GoogleLogo />
		<p>Continue with Google</p>
	</button>

	<button on:click={() => login('facebook')}>
		<p>Continue with Facebook</p>
	</button>
</div>

<!--!!!!!!!!!Vím že je to špatně, ale nemuze prestavovat cely kod od znova, to by jsme se vsichni strasne zpozdili-->
<style lang="scss">
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
</style>
