<script>
	import Times from '../../svg/Times.svelte'
	import Setting from '../../svg/Setting.svelte'
	import { navigate } from 'svelte-routing'
	import { onMount } from 'svelte'
	let showCookiePopUp = localStorage.getItem('cookies') !== 'accepted'
	let animation = false
	let url = window.location.href
	onMount(() => {
		if (url.replace(window.location.origin, "") === "/"){
			if (localStorage.getItem("ErantFirstTime") == null){
				animation = true
				setTimeout(() => {
					animation = false
					localStorage.setItem('ErantFirstTime', "false");
				}, 5000)
			}
		}
	})
</script>

{#if showCookiePopUp  && !animation}
	<div class="cookies">
		<div
			class="shadow w-[calc(var(--max-viewport-width))] max-w-[98%] h-auto rounded-[6px] overflow-hidden absolute bottom-0 bg-white gap-4 z-50 mb-[10px] flex flex-wrap flex-row justify-self-center"
		>
			<div class="w-full h-min grid grid-cols-[min-content_auto_min-content] gap-4 p-[16px]">
				<button on:click={() => navigate('cookies/settings')} class="w-min h-min flex-grow-0"><Setting /></button>
				<div class="flex flex-wrap flex-row gap-2">
					<div class="text-[28px] font-semibold">Cookies settings</div>
					<div>Our website uses cookies to operate, by continuing you agree to our <a class="text-[#4263EB]" href="/legal/cookie_policy.pdf">cookie policy</a>.</div>
				</div>
			</div>
			<div class="w-full h-auto flex justify-end bg-[#F3F4F6] p-[16px] gap-[20px]">
				<button
					on:click={() => {
						showCookiePopUp = false
						localStorage.setItem('cookies', 'declined')
					}}
					class="w-[84px] h-[37px] bg-[#OOO] text-black rounded-[8px] text-[18px]">Decline</button
				>
				<button
					on:click={() => {
						showCookiePopUp = false
						localStorage.setItem('cookies', 'accepted')
					}}
					class="w-[84px] h-[37px] bg-[#09205D] text-white rounded-[8px] text-[18px]">Accept</button
				>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.cookies{
		width: 100%;
		height: 100vh;
		position: absolute;
		z-index: 9999;
		backdrop-filter: blur(5px) brightness(60%);
	}
	.shadow {
		box-shadow: 0 0 1px;
		left: 50%;
		transform: translate(-50%, 0);
	}
</style>
