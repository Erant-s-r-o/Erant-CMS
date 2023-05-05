<script lang="ts">
	import NavigationBarLayout from '../../lib/components/Layouts/NavigationBarLayout.svelte'
	import { navigate } from 'svelte-routing'
	import ArrowBack from '$lib/svg/ArrowBack.svelte'

	import ProfileUpdate from './functions/Profile-Update.svelte'
	import Setting from './functions/Setting.svelte'
	import Cookies from './functions/Cookies.svelte'
	import InterestsUpdate from './functions/Interests-Update.svelte'

	const functions = [
		{ name: 'profile_update', display_name: 'Update Your Profile', view: ProfileUpdate },
		{ name: 'interests_update', display_name: 'Update your interests', view: InterestsUpdate },
		{ name: 'settings', display_name: 'Setting', view: Setting },
		{ name: 'cookies', display_name: 'Cookies', view: Cookies },
	]

	export let params: { function: string }

	let data = functions.find((element) => element.name === params.function.toLowerCase()) || null

	if (data === null) {
		window.location.href = '/profile'
	}
</script>

<div class="main w-full">
	<div class="head">
		<h1>{data.display_name}</h1>
	</div>

	<svelte:component this={data.view} />
</div>

<style lang="scss">
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: stretch;
		height: auto;
		.head {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 16px;
			margin-top: 16px;
			margin-bottom: 20px;

			position: relative;

			h1 {
				font-weight: 600;
				font-size: 32px;
				line-height: 40px;

				color: #000000;
				margin: 0;
			}
		}
	}
</style>
