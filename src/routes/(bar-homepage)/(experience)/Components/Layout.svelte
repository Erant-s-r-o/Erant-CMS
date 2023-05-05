<script lang="ts">
	import Section from '$lib/components/Common/Section.svelte'
	import Button from '$lib/components/Buttons/Button.svelte'
	import Image from '$lib/components/Common/Image.svelte'
	import { createEventDispatcher } from 'svelte'
	import Loading from '$lib/components/Common/Loading.svelte'
	const dispatch = createEventDispatcher()

	export let control: 'wrong-firstTime' | 'wrong-secondTime' | 'correct' | 'not-control' | null
	export let imgSrc: string = ''
	export let loading: boolean
	//
</script>

<div>
	<div class="wrap mt-2">
		<div class="w-full flex relative top-0 justify-center items-center">
			<div class="flex w-full justify-center items-center flex-col flex-wrap gap-3">
				<span class="title h-min"><slot name="title" /></span>
				{#if imgSrc}
					<span style="width: 100%"><Image class="w-full h-[200px]" src={imgSrc} /></span>
				{/if}
			</div>
		</div>
		<Section style="height: calc(100% - var(--quizHeader)); position: relative">
			<div class="flex items-center justify-center flex-col w-full gap-24 p-4">
				<div class="popis">
					<span> <slot name="about" /></span>
				</div>

				<div class="flex items-center justify-center flex-col w-full gap-6">
					<span class="relative"> <slot name="answers" /> </span>
					<div class="w-full relative flex justify-center h-fit size">
						{#if control === 'not-control' || control === null}
							<span />
						{:else if control === 'wrong-secondTime' || control === 'correct'}
							<div class="flex w-auto h-auto flex-wrap flex-col items-center gap-2">
								<span class={`${control === 'correct' ? 'text-green-500' : 'text-red-500'}`}>{control === 'correct' ? 'správně' : 'špatně'}</span>
								<span> <slot name="after" /></span>
							</div>
						{:else if control === 'wrong-firstTime'}
							<div class="flex w-auto h-auto flex-wrap flex-col items-center gap-2">
								<span class="text-red-500">To není správně, zkus to znovu</span>
								<span> <slot name="hint" /></span>
							</div>
						{/if}
					</div>
					{#if control === 'not-control' || control === 'correct' || control === 'wrong-secondTime'}
						<Button on:submit={() => dispatch('nextQuestion')} primary class="w-3/4 max-w-sm min-w-[400px] h-16 bottom-0 m-10 relative">
							{#if loading}
								<Loading />
							{:else}
								Na další otázku
							{/if}
						</Button>
					{:else if control === 'wrong-firstTime' || control === null}
						<Button disabled={loading} on:submit primary class="w-3/4 max-w-sm min-w-[400px] h-16 bottom-0 m-10 relative">
							{#if loading}
								<Loading />
							{:else}
								Vyhodnotit
							{/if}
						</Button>
					{/if}
				</div>
			</div>
		</Section>
	</div>
</div>

<style lang="scss">
	.wrap {
		height: 100%;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;

		.title {
			font-size: var(--fontSize);
			font-weight: 600;
		}

		.popis {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-size: 24px;
			font-weight: 700;
			text-align: center;
			gap: 8px;
			color: var(--grey);
		}
	}
</style>
