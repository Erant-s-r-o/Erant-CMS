<script lang="ts">
	import Marker from '@beyonk/svelte-mapbox/map/Marker.svelte';
	import { Tooltip } from 'flowbite-svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	const dispatch = createEventDispatcher();

	export let lat = 0;
	export let lng = 0;
	export let userLocation = { lat: 0, lng: 0 };
	export let popup: string | null = null;

	export let round = (1 / 110.574 / 1000) * 12; //cca 12m nutno pozměnit!!!!!!!!!! tento komentář nemazat
	let Mlat = [lat - round, lat + round];
	let Mlng = [lng - round, lng + round];
	$: isIn = userLocation
		? userLocation.lat > Mlat[0] &&
		  userLocation.lat < Mlat[1] &&
		  userLocation.lng > Mlng[0] &&
		  userLocation.lng < Mlng[1]
		: null;

	$: isIn && dispatch('enter', { lat, lng, userLocation });
</script>

<Marker popup={false} {lat} {lng}>
	<button on:click>
		<svg
			width="28"
			height="27"
			viewBox="0 0 112 108"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M64.488 103.367L89.7283 62.4464C106.409 35.4037 86.9542 0.547852 55.1801 0.547852C22.7617 0.547852 3.42399 36.6756 21.4041 63.6502L48.0703 103.656C52.0131 109.571 60.7561 109.417 64.488 103.367Z"
				fill="url(#paint0_radial_1068_1071)"
				fill-opacity="0.4"
			/>
			<path
				d="M63.4756 91.4251L82.4058 60.4583C94.9161 39.9936 80.3252 13.6162 56.4947 13.6162C32.1808 13.6162 17.6776 40.9562 31.1627 61.3693L51.1623 91.644C54.1194 96.1203 60.6766 96.0037 63.4756 91.4251Z"
				fill="url(#paint1_linear_1068_1071)"
			/>
			<circle cx="55.6164" cy="35.6164" r="11.6164" fill="white" />
			<defs>
				<radialGradient
					id="paint0_radial_1068_1071"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(55.1781 54.2739) rotate(90.2138) scale(47.7265 37.7293)"
				>
					<stop offset="0.865366" stop-color="#FFD325" />
					<stop offset="1" stop-color="#FFE066" stop-opacity="0.1" />
				</radialGradient>
				<linearGradient
					id="paint1_linear_1068_1071"
					x1="40.9078"
					y1="34.3967"
					x2="71.9265"
					y2="73.4203"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FFBF00" />
					<stop offset="1" stop-color="#DD8706" />
				</linearGradient>
			</defs>
		</svg>
	</button>
	{#if popup}
		<Tooltip class="absolute">{popup}</Tooltip>
	{/if}
</Marker>
