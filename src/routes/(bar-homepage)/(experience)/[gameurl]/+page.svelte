<script lang="ts">
	import Overlay from '$lib/components/Layouts/LayoutImg.svelte';
	import Section from '$lib/components/Common/Section.svelte';
	import Button from '$lib/components/Buttons/Button.svelte';
	import Bubble from '$lib/components/Common/Bubble.svelte';
	import IconStar from '$lib/svg/Star.svelte';
	import IconPoint from '$lib/svg/Point.svelte';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Renderer from '../Forms/Renderer.svelte';
	import Marker from '$lib/components/Map/Marker.svelte';

	import { getLocationDataFromLatAndLong } from '$lib/utils/locations';
	import { Experience } from '$lib/TStypes/experiencesTypes';
	import Progressbar from '$lib/components/erant/Progressbar.svelte';
	import { writable } from 'svelte/store';
	import Alert from '$lib/components/Common/Alert.svelte';
	import { Button as FlowbiteButton } from 'flowbite-svelte';
	import { databases, user } from '$lib/appwrite';
	import { Query } from 'appwrite';
	import { browser } from '$app/environment';
	//import { PageData } from './$types';

	//export let params: { gameurl: string } = { gameurl: 'pisek-mesto-kralovske' };

	export let data; //: PageData;

	//let gameData = writable<Experience>(undefined);
	//let [id] = getExperienceIdByUrlAsStore(params.gameurl);
	//$: [userProgress, userProgressLoading] = data.experience ? getUserProgressAsStore($id) : [];

	//$: [gameData] = data.experience ? [] : loadAsStore(params.gameurl);

	let view: 'experience-play' | 'experience-loading' | 'experience-preview' =
		'experience-loading';

	view = 'experience-preview';

	const deleteProgress = async () => {
		const documentsToDelete = data.userProgress?.map(({ $id }) =>
			databases.deleteDocument('63cef30d6da945dd4250', 'users-answers', $id)
		);
		const res = await Promise.all(documentsToDelete ?? []);
		deleteProgressAlertVisible = false;
		data.userProgress = [];
	};

	let deleteProgressAlertVisible = false;
</script>

{#if browser}
	{#if deleteProgressAlertVisible}
		<Alert color="red" let:color>
			<span slot="title">Delete your progress</span>
			<div class="text-black">
				<span
					>Are you sure that you want to delete your progress in experience {data
						.experience?.ExpName}</span
				>
				<span>Experience Id: {data.experience?.$id}</span>
				<span>Your current score is: {data.userProgress?.length} checkPoints</span>
			</div>
			<div slot="buttons">
				<FlowbiteButton on:click={deleteProgress} {color}>Yes I'm sure</FlowbiteButton>
				<FlowbiteButton
					on:click={() => (deleteProgressAlertVisible = false)}
					outline
					{color}>No, I missed clicked</FlowbiteButton
				>
			</div>
		</Alert>
	{/if}

	{#if view === 'experience-loading'}
		<h1 class="flex items-center justify-center flex-col h-full">
			<span>Experience is loading...</span>
			<Loading />
		</h1>
	{:else if view === 'experience-preview'}
		<Overlay shareData={{ url: window.location.href }} img={data.experience?.ExpImage}>
			<div>
				<span class="text-[36px]">{data.experience?.ExpName}</span>
				<div class="bubbles">
					<Bubble background="blue">
						<span slot="icon"><IconStar /></span>
						<span> {data.experience?.rating} </span>
					</Bubble>
					<Bubble background="white">
						<span slot="icon"><IconPoint /></span>
						{#await getLocationDataFromLatAndLong(data.experience.ExpLocation[0], data.experience.ExpLocation[1]) then { city }}
							<span>{city}</span>
						{/await}
					</Bubble>
				</div>
			</div>

			{#if data.experience.ExpIntroduction}
				<Section title="Description">
					<span>
						{@html data.experience.ExpIntroduction}
					</span>
				</Section>
			{/if}

			<!--<Section title="Fotky">
		<div class="w-full relative">
			<div class="px-4 m-auto" style="max-width: var(--max-viewport-width);">
				<ImageSlider images={assets} />
			</div>
		</div>
	</Section>-->
			<Section title="Progress">
				<Progressbar
					max={data.experience.ExpCPsID.length}
					progress={data.userProgress.length}
					showWrittenProgress
				/>
			</Section>

			<div class="w-full relative">
				<div class="px-4 m-auto" style="max-width: var(--max-viewport-width);">
					<Map
						radius
						class="w-full h-44"
						center={{
							lng: data.experience.ExpLocation[1],
							lat: data.experience.ExpLocation[0]
						}}
					>
						{#each data.experience.checkPoints as { CPLocation: [lat, lng] }}
							<Marker {lat} {lng} />
						{/each}
					</Map>
				</div>
			</div>

			{#if data.experience.checkPoints.length && !(data.experience.ExpCPsID.length === data.userProgress.length)}
				<Button on:click={() => (view = 'experience-play')} primary
					>{data.userProgress.length ? 'Pokračovat' : 'Hrát'}</Button
				>
			{/if}
			{#if data.userProgress.length}
				<Button
					class="!bg-red-500"
					on:click={() => (deleteProgressAlertVisible = true)}
					primary>resetovat progress</Button
				>
			{/if}
		</Overlay>
	{:else if view === 'experience-play'}
		<Renderer userProgress={data.userProgress} gameData={data.experience} />
	{/if}
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
