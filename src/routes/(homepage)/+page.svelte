<script>
	import NavigationBarLayout from '../../lib/components/Layouts/NavigationBarLayout.svelte';
	import { Img } from 'flowbite-svelte';
	import Discover from './Components/Discover.svelte';
	import Top from './Components/Top.svelte';
	import Categories from './Components/Categories.svelte';
	import Comparment from './Components/Comparment.svelte'; //do budoucna bych to udělal pomocí komponent
	import { onMount } from 'svelte';
	import Animation from './Components/Animation.svelte';
	import { getExperiences } from '$lib/utils/database/experience';
	import Loading from '$lib/components/Common/Loading.svelte';
	import { browser } from '$app/environment';

	let fitstTime = false;
	onMount(() => {
		if (localStorage.getItem('ErantFirstTime') == null) {
			fitstTime = true;
			setTimeout(() => {
				fitstTime = false;
				localStorage.setItem('ErantFirstTime', 'false');
			}, 11000);
		}
	});

	let city = '';
	let state = '';

	if (browser && 'geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(async (position) => {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			const response = await fetch(
				`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
			);
			const data = await response.json();

			city = data.address.town || data.address.city || data.address.village;
			state = ', ' + data.address.country;
		});
	}
</script>

{#if !fitstTime}
	<Top headline={city + state} />

	<Discover />

	<div class="line" />

	<Categories />

	{#await getExperiences()}
		<div class="w-full h-24 flex items-center justify-center">
			<Loading />
		</div>
	{:then experiences}
		<Comparment items={experiences} />
	{/await}
{:else}
	<div class="content">
		<Animation />
	</div>
{/if}

<style>
	.content {
		height: calc(100%);
		width: 100%;
		margin-bottom: 94px;

		overflow-y: scroll;
		overflow-x: hidden;
		position: relative;

		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none;
	}

	.content::-webkit-scrollbar {
		display: none;
	}

	.line {
		width: calc(100% - 48px);
		height: 1px;
		background-color: #efeff0;
		margin: 20px auto 20px auto;
	}

	@media screen and (max-width: 370px) {
		.line {
			width: calc(100% - 24px);
			margin: 5.4vw auto 5.4vw auto;
		}
	}
</style>
