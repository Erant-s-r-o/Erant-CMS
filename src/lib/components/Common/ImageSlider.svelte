<script>
	import Image from './Image.svelte'

	export let images
	let windowsize
	let overflow = 'hidden'
	const nextImages = () => {
		overflow = 'auto'
		images = images
		windowsize = Infinity
	}
</script>

<div style="overflow-y: {overflow}" bind:offsetWidth={windowsize} class="imageSlider">
	{#each images as image, i}
		<!--{#if Math.floor(windowsize / (94 + 10)) >= i + 1}-->
		<div>
			<Image src={image} class="w-24 h-24" />
			<!--{#if Math.floor(windowsize / (94 + 10)) === i + 1 && images.length !== i + 1}
					<span on:click={nextImages} class="imageCounter">{`+${images.length - Math.floor(windowsize / (94 + 10))}`}</span>
				{/if}-->
		</div>
		<!--{/if}-->
	{/each}
</div>

<style>
	.imageSlider {
		display: flex;
		justify-content: space-between;
		width: 100%;
		gap: 10px;
		position: relative;
	}
</style>
