<script lang="ts">
	import Marker from '$lib/components/Map/Marker.svelte';
	import TextForm from './TextForm.svelte';
	import NumberForm from './NumberForm.svelte';
	import SingleForm from './SingleChoiceForm.svelte';
	import MultiplyForm from './MultiChoiceForm.svelte';
	//import IntervalForm from './IntervalForm.svelte';
	//import QrCode from './QrCode.svelte';
	import Finish from './Finish.svelte';
	import { data } from '$lib/stores/stores';
	import Erantmap from '$lib/components/Map/Erantmap.svelte';
	import Info from './Info.svelte';
	import { Experience } from '$lib/TStypes/experiencesTypes';
	import Layout from '../Components/Layout.svelte';
	import {
		answer,
		AnswerState,
		getUserAnswer,
		getUserProgressAsStore
	} from '$lib/utils/database/experience';
	import { user } from '$lib/appwrite';
	import Button from '$lib/components/Buttons/Button.svelte';
	import LayoutImg from '$lib/components/Layouts/LayoutImg.svelte';
	import { Models } from 'appwrite';
	import { Writable } from 'svelte/store';
	import { Button as FlowbiteButton } from 'flowbite-svelte';

	const components = {
		TEXT: TextForm,
		NUMBER: NumberForm,
		RADIO: SingleForm,
		CHECKBOX: MultiplyForm,
		//interval: IntervalForm,
		//qrcode: QrCode,
		INFO: Info
	};

	export let control: AnswerState = null;
	let view: 'question' | 'map' | 'end' | 'start' | 'start-map' = 'start-map';
	export let gameData: Experience; //data
	export let userProgress: any[];
	//$: [userProgress, userProgressLoading] = getUserProgressAsStore(gameData.$id)

	let client = {
		//user data about game
		pos: 0,
		end: gameData.ExpCPsID.length - 1, //kolik otázek
		points: 0,
		possiblePointsToSeize: new Array(gameData.checkPoints.length)
			.fill(2)
			.reduce((accumulator, currentValue, index) => {
				if (gameData.checkPoints[index].CPType !== 'INFO')
					return accumulator + currentValue;
				else return accumulator;
			})
	};

	$: if (client.pos < userProgress?.length - 1 + 1) {
		// nastaví na continue
		client.pos = userProgress?.length - 1 + 1;
		client.points = userProgress
			?.map((i) => (i.correct ? (2 as number) : (0 as number)))
			?.reduce((accumulator, currentValue) => accumulator + currentValue);

		view = 'map';
	}

	$: if (gameData.checkPoints[client.pos].CPType === 'INFO') control = 'not-control';

	const nextQuestion = () => {
		//další otázka
		control = null;
		if (client.pos === client.end) view = 'end';
		else {
			client.pos++;
			view = 'map';
		}
	};

	$: checkPoint = gameData.checkPoints[client.pos];
	$: checkPointType = checkPoint?.CPType;

	let page: ConstructorOfATypedSvelteComponent | null = null;
	$: page = view === 'question' ? components[checkPointType] : null;

	let [lat, lng] = [0, 0];
	$: if (client.pos < client.end)
		[lat, lng] =
			view === 'map' ? gameData.checkPoints[client.pos].CPLocation : gameData.ExpLocation;

	let userLocation = { lat: 0, lng: 0 };

	let myAnswer: string | string[];
	let clear: boolean = false;
	let answerLoading = false;

	const checkAnswer = async () => {
		answerLoading = true;
		try {
			const res = await answer(gameData.$id, checkPoint.$id, myAnswer);
			if (checkPointType === 'INFO') {
				nextQuestion();
			} else {
				if (res) {
					control = 'correct';
					client.points += 2;
				} else if (control === null) {
					control = 'wrong-firstTime';
					clear = true;
				} else control = 'wrong-secondTime';
				setTimeout(() => (clear = false), 400);
			}
		} catch (error) {
			console.log(error);
		}
		myAnswer = '';
		answerLoading = false;
	};

	const admins = [
		'641b2cd262519fdd33ec',
		'643bfde664ea0c643112',
		'643bfdd8c64e75d0b8ea',
		'6427218926d6ab7f8e52',
		'641d5642c8fa96066cf2',
		'641b42847ac86f9a306c',
		'63daafd3355edb14483d'
	];
</script>

{#if view === 'map' || view === 'start-map'}
	{#if admins.includes($user.$id)}<!--only if admin-->
		<FlowbiteButton
			class="absolute z-50"
			color="red"
			on:click={() => (view = view === 'start-map' ? 'start' : 'question')}
			>disappear map</FlowbiteButton
		>
	{/if}

	<Erantmap bind:userLocation class="w-full h-full">
		<Marker
			on:enter={() => (view = view === 'start-map' ? 'start' : 'question')}
			{lat}
			{lng}
			{userLocation}
		/>
	</Erantmap>
{/if}

{#if view === 'start'}
	<LayoutImg img={gameData.ExpImage}>
		<div class="w-full h-auto flex flex-wrap flex-row gap-4 justify-center">
			<div
				class="h-full w-full flex justify-self-center justify-center text-[32px] flex-wrap flex-col gap-4 items-center"
			>
				{@html gameData.ExpStart}
			</div>
			<Button class="w-80 mt-8 " on:click={() => (view = 'map')}>pokračovat</Button>
		</div>
	</LayoutImg>
{/if}

{#if view === 'question'}
	<Layout
		loading={answerLoading}
		imgSrc={checkPoint.CPImage}
		on:submit={() => checkAnswer()}
		on:nextQuestion={() => {
			if (checkPointType === 'INFO') checkAnswer();
			else nextQuestion();
		}}
		{control}
	>
		<span slot="title">{checkPoint.CPName}</span>
		<span slot="about">{@html checkPoint.CPText}</span>

		<span slot="hint">
			{#if checkPoint.CPHint}
				{@html checkPoint.CPHint}
			{/if}
		</span>
		<span slot="after">
			{#if checkPoint.CPAfter}
				{@html checkPoint.CPAfter}
			{/if}
		</span>
		<div slot="answers">
			<span class="self-baseline">
				<svelte:component this={page} {clear} {checkPoint} bind:myAnswer />
			</span>
		</div>
	</Layout>
{/if}
{#if view === 'end'}
	<Finish {client} {gameData} />
{/if}
