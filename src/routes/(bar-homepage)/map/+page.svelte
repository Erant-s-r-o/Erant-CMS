<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import NavigationBarLayout from '$lib/components/Layouts/NavigationBarLayout.svelte';
	import Erantmap from '$lib/components/Map/Erantmap.svelte';
	import LocationRequest from '$lib/components/Map/LocationRequest.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';
	import { getExperiencesAsStore } from '$lib/utils/database/experience';
	import { onMount } from 'svelte';

	let userLocation: { lat: number; lng: number } = { lat: 0, lng: 0 };

	/*const handleLocationGranted = (position: GeolocationPosition) => {
		userLocation = { lat: position.coords.latitude, lng: position.coords.longitude }
		granted = true
	}*/

	//navigator.geolocation.getCurrentPosition(handleLocationGranted)

	//$: [experiences] = getExperiencesAsStore();
</script>

<!-- Conditionally center on current location if granted is true. -->
<Erantmap class="w-full h-full" center={{ lng: userLocation.lng, lat: userLocation.lat }}>
	<!--{#each $experiences as experience}
		<Marker
			popup={experience.ExpName}
			on:click={() => goto(`/${experience.ExpURL}`)}
			lat={experience.ExpLocation[0]}
			lng={experience.ExpLocation[1]}
			{userLocation}
		/>
	{/each}-->
</Erantmap>
