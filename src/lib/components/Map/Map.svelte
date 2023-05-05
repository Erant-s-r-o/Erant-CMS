<script lang="ts">
	//import { Mapbox } from '$lib/TStypes/mapBoxTypes';
	import { Map, controls } from '@beyonk/svelte-mapbox/components';
	const { GeolocateControl } = controls;
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();
	export let mapComponent: any;
	let geolocateControl;
	let className = '';
	export { className as class };

	export let radius = false;
	export let center: { lng: number; lat: number } = { lng: 0, lat: 0 };

	/*export const geo = (e) => {
		geolocateControl.dispatchEvent('geolocate')
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords
				user = { lat: latitude, lng: longitude }
				dispatch('move', user)
			})
		} else {
			alert("Can't load your location!")
		}
	}*/
</script>

<div class={className} class:radius>
	<Map
		center={[center.lng, center.lat]}
		accessToken="pk.eyJ1IjoiZXJhbnQ0MiIsImEiOiJjbDdybXo4dmswZ3E5M3FwMnFsazdpb3VoIn0.wXblbreOUt3e8N81CAH0Wg"
		style="mapbox://styles/mapbox/outdoors-v11"
		bind:this={mapComponent}
		on:ready={() => {
			mapComponent.resize();
			mapComponent.setCenter([center.lng, center.lat] /*, 14*/);
			dispatch('ready');
		}}
		on:recentre={(e) => {}}
		zoom={14}
	>
		<slot />
	</Map>
</div>

<style lang="scss">
	div {
		overflow: hidden;

		&.radius {
			border-radius: 25px;
		}
	}
	:global(.mapboxgl-ctrl-top-left) {
		display: none;
	}
	:global(.mapboxgl-marker) {
		cursor: pointer;
	}
</style>
