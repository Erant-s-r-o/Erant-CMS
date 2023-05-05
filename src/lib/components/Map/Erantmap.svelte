<script lang="ts">
	import GeolocateControl from '@beyonk/svelte-mapbox/map/controls/GeolocateControl.svelte';
	import Map from './Map.svelte';
	import { navigate } from 'svelte-routing';
	import NavigationBarLayout from '../Layouts/NavigationBarLayout.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import LocationRequest from './LocationRequest.svelte';
	//import { Mapbox } from '$lib/TStypes/mapBoxTypes';
	const dispatch = createEventDispatcher();

	export let center: { lat: number; lng: number } = { lat: 0, lng: 0 };

	export let mapComponent: unknown = undefined;
	export let userLocation = { lat: 0, lng: 0 };

	let className = '';
	export { className as class };
	/*;(() => {
		navigator.geolocation.getCurrentPosition(() => {
			navigator.geolocation.watchPosition((e) => {
				console.log(e)
			})
		})
	})()*/
	/*
	navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
		if (!userLocation)
			userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
		if (!center) center = { lat: position.coords.latitude, lng: position.coords.longitude };
	}); //at mapbox this is required dont know why
*/
	$: if (!center) center = userLocation;
	/*	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(showPosition, () => dispatch('locationFailed'))
	} else {
		alert("Can't load your location!")
	}
	function showPosition(position) {
		user.lat = position.coords.latitude
		user.lng = position.coords.longitude
		if (!center) center = user
	}*/

	const userCenter = () => {
		// @ts-ignore
		if (trigger) trigger();
	};

	let trigger: Function;
</script>

<LocationRequest />

{#if center}
	<Map
		on:ready={() => setTimeout(() => userCenter(), 100)}
		{center}
		bind:mapComponent
		class={className}
		on:move
	>
		<slot />
		<GeolocateControl
			options={{
				trackUserLocation: true,
				showUserHeading: true,
				positionOptions: {
					enableHighAccuracy: true
				}
			}}
			bind:trigger
			on:trackuserlocationstart={() => {}}
			on:geolocate={(e) => {
				// @ts-ignore
				const { latitude, longitude } = e.detail.coords;
				userLocation = { lat: latitude, lng: longitude };
			}}
		/>
	</Map>
	<div class="on">
		<button on:click={() => navigate('/scanner')}>
			<svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M5.77778 8.66765C5.77778 7.07876 7.07778 5.77876 8.66667 5.77876H14.4445C16.0333 5.77876 17.3333 4.47876 17.3333 2.88987C17.3333 1.30098 16.0333 0.000976562 14.4445 0.000976562H5.77778C2.6 0.000976562 0 2.60098 0 5.77876V14.4454C0 16.0343 1.3 17.3343 2.88889 17.3343C4.47778 17.3343 5.77778 16.0343 5.77778 14.4454V8.66765ZM2.88889 34.666C1.3 34.666 0 35.966 0 37.5549V46.2216C0 49.3994 2.6 51.9994 5.77778 51.9994H14.4445C16.0333 51.9994 17.3333 50.6994 17.3333 49.1105C17.3333 47.5216 16.0333 46.2216 14.4445 46.2216H8.66667C7.07778 46.2216 5.77778 44.9216 5.77778 43.3327V37.5549C5.77778 35.966 4.47778 34.666 2.88889 34.666ZM37.5553 0.000976562H46.222C49.3998 0.000976562 51.9998 2.60098 51.9998 5.77876V14.4454C51.9998 16.0343 50.6998 17.3343 49.1109 17.3343C47.522 17.3343 46.222 16.0343 46.222 14.4454V8.66765C46.222 7.07876 44.922 5.77876 43.3331 5.77876H37.5553C35.9664 5.77876 34.6664 4.47876 34.6664 2.88987C34.6664 1.30098 35.9664 0.000976562 37.5553 0.000976562ZM46.2221 43.3327C46.2221 44.9216 44.9221 46.2216 43.3332 46.2216H37.5554C35.9665 46.2216 34.6665 47.5216 34.6665 49.1105C34.6665 50.6994 35.9665 51.9994 37.5554 51.9994H46.2221C49.3998 51.9994 51.9998 49.3994 51.9998 46.2216V37.5549C51.9998 35.966 50.6998 34.666 49.111 34.666C47.5221 34.666 46.2221 35.966 46.2221 37.5549V43.3327ZM28.8881 23.1085H23.1104V28.8838H17.3345V34.6616H23.1123V28.8862H28.8881V23.1085ZM23.1123 28.8862V28.8838H23.1104V28.8862H23.1123ZM28.8912 28.8838H34.6689V34.6616H28.8912V28.8838ZM34.669 17.3302H28.8913V23.108H34.669V17.3302ZM17.3345 17.3301H23.1123V23.1079H17.3345V17.3301Z"
					fill="#4263EB"
				/>
			</svg>
		</button>
		<button on:click={() => userCenter()}>
			<svg viewBox="0 0 29 39" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M0.758179 14.1551C0.758179 6.53234 6.92333 0.367188 14.5461 0.367188C22.1688 0.367188 28.3339 6.53234 28.3339 14.1551C28.3339 22.3687 19.6279 33.6945 16.0627 38.0081C15.2748 38.9536 13.837 38.9536 13.0491 38.0081C9.46424 33.6945 0.758179 22.3687 0.758179 14.1551ZM9.62182 14.1551C9.62182 16.8733 11.8279 19.0793 14.5461 19.0793C17.2642 19.0793 19.4703 16.8733 19.4703 14.1551C19.4703 11.4369 17.2642 9.23083 14.5461 9.23083C11.8279 9.23083 9.62182 11.4369 9.62182 14.1551Z"
					fill="#4263EB"
				/>
			</svg>
		</button>
	</div>
{/if}

<style>
	.on {
		position: absolute;
		display: flex;
		flex-direction: column;
		gap: 27px;
		right: 23px;
		bottom: 140px;
	}
	button {
		width: 60px;
		height: 60px;
		border-radius: 25px;
		position: relative;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button:hover,
	button:active {
		opacity: 70%;
	}
	button > svg {
		height: 56%;
		width: auto;
	}
</style>
