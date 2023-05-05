<script lang="ts">
	import Logout from './../../lib/svg/Logout.svelte'
	import Help from './../../lib/svg/Help.svelte'
	import Line from '$lib/components/Common/Line.svelte'
	import SettingRow from '$lib/components/Common/SettingRow.svelte'
	import Profile from '$lib/svg/Profile.svelte'
	import Pen from '$lib/svg/Pen.svelte'
	import Setting2 from '$lib/svg/Setting2.svelte'
	import { Link } from 'svelte-routing'
	import NavigationBarLayout from '../../lib/components/Layouts/NavigationBarLayout.svelte'
	import CookieMonster from '$lib/svg/CookieMonster.svelte'
	import Warning from '$lib/svg/Warning.svelte'
	import PointSmall from '$lib/svg/PointSmall.svelte'
	import InputPicture from '$lib/components/Inputs/InputPicture.svelte'
	import { account, user } from '$lib/appwrite'
	import collections from '$lib/collections'
	import { Query } from 'appwrite'

	export let params: { erantId: string }
	//
	$: [userInfo] = collections.users.getDocument([Query.equal('erantId', params.erantId)])

	const items = [
		{
			title: 'Account',
			itms: [
				{ icon: Profile, text: 'Update Your Profile', link: '/profile/setting/profile_update' },
				{ icon: Pen, text: 'Update Your Interests', link: '/profile/setting/interests_update' },
			],
		},
		{
			title: 'Settings',
			itms: [
				{ icon: Setting2, text: 'Setting', link: '/profile/setting/settings' },
				{ icon: CookieMonster, text: 'Cookies', link: '/profile/setting/cookies' },
			],
		},
		{
			title: 'Legal',
			itms: [
				{ icon: Help, text: 'Help', link: '/' },
				{ icon: Warning, text: 'Terms & Condition', link: '/' },
				{ icon: Logout, text: 'Log out', link: () => user.deleteSessions() },
				,
			],
		},
	]
</script>

<div class="w-full h-full p-2">
	{#if $userInfo}
		<div class="w-full h-[188px] flex flex-wrap flex-col gap-4 justify-center items-center mb-8">
			<InputPicture />
			<span class="font-semibold text-[24px]">{$userInfo.userName}</span>
			<SettingRow class="w-auto gap-2">
				<PointSmall />
				<span class="text-[16px] text-[#61646B]">Prague, Czechia</span>
			</SettingRow>
		</div>
		<Line />

		<div class="w-full h-auto flex flex-wrap flex-row mt-4 gap-4">
			{#each items as { title, itms }}
				<div class="mb-4 text-[18px] text-[#61646B]">{title}</div>
				{#each itms as { icon, text, link }}
					{#if typeof link === 'function'}
						<SettingRow>
							<svelte:component this={icon} />
							<button class="font-semibold text-[18px]" on:click={link}>{text}</button>
						</SettingRow>
					{:else}
						<SettingRow>
							<svelte:component this={icon} />
							<Link class="font-semibold text-[18px]" to={link}>{text}</Link>
						</SettingRow>
						<Line />
					{/if}
				{/each}
			{/each}
		</div>
	{/if}
</div>
