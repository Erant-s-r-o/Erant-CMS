<script lang="ts">
	import LayoutImg from '../../../lib/components/Layouts/LayoutImg.svelte'
	import Button from '../../../lib/components/Buttons/Button.svelte'
	import { Experience } from '$lib/TStypes/experiences'
	import { navigate } from '$lib/router'
	export let gameData: Experience
	export let client
	let score = (client.points / client.possiblePointsToSeize) * 100
	console.log(score)
</script>

<LayoutImg img={gameData.ExpImage}>
	<div class="w-full h-auto flex flex-wrap flex-row gap-4 justify-center">
		<div class="h-full w-full flex justify-self-center justify-center text-[32px]  flex-wrap flex-col gap-4 items-center">
			<span> Získali jste {client.points} / {client.possiblePointsToSeize} bodů</span>
			<span>
				{#if score > 90}
					{@html gameData.ExpEnd100}
				{:else if score > 50}
					{@html gameData.ExpEnd60}
				{:else}
					{@html gameData.ExpEnd0}
				{/if}
			</span>
		</div>
		<Button class="w-80 mt-8 " on:click={() => navigate(-1)}>ukončit hru</Button>
	</div>
</LayoutImg>
