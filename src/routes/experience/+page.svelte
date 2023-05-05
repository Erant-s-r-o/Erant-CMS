<script lang="ts">
	import Overlay from '../../lib/components/Layouts/LayoutImg.svelte'
	import Section from '../../lib/components/Common/Section.svelte'
	import Button from '../../lib/components/Buttons/Button.svelte'
	import Bubble from '../../lib/components/Common/Bubble.svelte'
	import IconStar from '../../lib/svg/Star.svelte'
	import IconPoint from '../../lib/svg/Point.svelte'
	import Loading from '../../lib/components/Common/Loading.svelte'
	import { data } from '../../lib/stores/stores'
	import GeolocateControl from '@beyonk/svelte-mapbox/src/lib/map/controls/GeolocateControl.svelte'
	import Map from '../../lib/components/Map/Map.svelte'
	import Renderer from './Forms/Renderer.svelte'
	import Marker from '../../lib/components/Map/Marker.svelte'
	import { onMount } from 'svelte'
	import { getExperienceIdByUrl, getExperienceIdByUrlAsStore, getUserProgress, getUserProgressAsStore, load, loadAsStore } from '$lib/utils/database/experience'
	import { getLocationDataFromLatAndLong } from '$lib/utils/locations'
	import { navigate } from '$lib/router'
	import { Experience } from '$lib/TStypes/experiences'
	import Progressbar from '$lib/components/erant/Progressbar.svelte'
	import { writable } from 'svelte/store'

	export let params: { gameurl: string }
	let gameData = writable<Experience>(null)
	let [id] = getExperienceIdByUrlAsStore(params.gameurl)
	$: [userProgress] = $gameData ? getUserProgressAsStore($id) : []
	/*
	$: [gameData] = loadAsStore(params.gameurl, $userProgress?.length + 4 || 8, (preview) => {
		$gameData = preview
		view = 'experience-preview'
	})*/

	$: [gameData] = loadAsStore(params.gameurl)
	$: if ($gameData) view = 'experience-preview'

	/*onMount(async () => {
		try {
			$gameData = await load(params.gameurl)
			view = 'experience-preview'
		} catch (error) {
			navigate('/error')
		}
	})*/

	/*$: assets = $gameData?.questions
		?.filter((q) => q.thumbnail !== null)
		?.slice(0, 8)
		?.map((q) => q.thumbnail)*/

	let view: 'experience-play' | 'experience-loading' | 'experience-preview' = 'experience-loading'

	//is user already in game
	//const userInGame = JSON.parse(localStorage.getItem(location.pathname))
	//$: if ($gameData && userInGame) view = 'game-play'
</script>

{#if view === 'experience-loading'}
	<h1 class="flex items-center justify-center flex-col">
		<span>Experience is loading...</span>
		<Loading />
	</h1>
{:else if view === 'experience-preview'}
	<Overlay shareData={{ url: window.location.href }} img={$gameData.ExpImage}>
		<div>
			<span class="text-[36px]">{$gameData.ExpName}</span>
			<div class="bubbles">
				<Bubble background="blue">
					<span slot="icon"><IconStar /></span>
					<span> {$gameData.rating} </span>
				</Bubble>
				<Bubble background="white">
					<span slot="icon"><IconPoint /></span>
					{#await getLocationDataFromLatAndLong($gameData.ExpLocation[0], $gameData.ExpLocation[1]) then { city }}
						<span>{city}</span>
					{/await}
				</Bubble>
			</div>
		</div>

		{#if $gameData.ExpIntroduction}
			<Section title="Popis">
				<span>
					{@html $gameData.ExpIntroduction}
				</span>
			</Section>
		{/if}

		<Section title="Fotky">
			<div class="w-full relative">
				<div class="px-4 m-auto" style="max-width: var(--max-viewport-width);">
					<!--<ImageSlider images={assets} />-->
				</div>
			</div>
		</Section>
		<Section title="Progress">
			<Progressbar max={$gameData.ExpCPsID.length} progress={$userProgress.length} showWrittenProgress />
		</Section>

		<div class="w-full relative">
			<div class="px-4 m-auto" style="max-width: var(--max-viewport-width);">
				<Map radius class="w-full h-44" center={{ lng: $gameData.ExpLocation[1], lat: $gameData.ExpLocation[0] }}>
					{#each $gameData.checkPoints as { CPLocation: [lat, lng] }}
						<Marker {lat} {lng} />
					{/each}
				</Map>
			</div>
		</div>

		{#if $gameData.checkPoints.length}
			<Button on:click={() => (view = 'experience-play')} primary>{$userProgress ? 'Pokračovat' : 'Hrát'}</Button>
		{/if}
	</Overlay>
{:else if view === 'experience-play'}
	<Renderer gameData={$gameData} />
{/if}

<style>
	.bubbles {
		display: flex;
		height: fit-content;
		width: 100%;
		align-items: center;
		justify-content: flex-start;
		gap: 15px;
	}
</style>
