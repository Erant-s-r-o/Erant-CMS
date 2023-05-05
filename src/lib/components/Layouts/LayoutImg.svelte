<script lang="ts">
	import Sharebutton from '../Buttons/Sharebutton.svelte';
	export let img: string = '';
	export let shareData: { url: string } = undefined;
	export let alt = 'background image';
</script>

<div class="h-full w-full overflow-auto">
	<section class="wraper">
		{#if img}
			<img class="h-auto w-full min-h-[400px]" src={img} {alt} />
		{/if}
		{#if shareData}
			<div class="shareButton">
				<Sharebutton {shareData} />
			</div>
		{/if}
		<section class="overlay">
			<slot />
		</section>
	</section>
</div>

<style lang="scss">
	.wraper {
		position: relative;
		height: 100%;
		width: 100%;
		clip-path: inset(0);
		overflow: auto;

		.overlay {
			min-height: 75vh;
			height: auto;
			width: 100%;
			overflow-y: auto;
			position: relative;
			top: -10%;
			border-radius: 70px 70px 0 0;
			padding: 52px;
			display: flex;
			flex-direction: column;
			row-gap: 35px;
			z-index: 7;
			background-color: white;
		}

		img {
			z-index: 4;
			width: 100%;
			height: auto;
			position: relative;
		}
		.shareButton {
			width: 100%;
			height: calc(100% - 75%);
			display: flex;
			justify-content: flex-end;
			align-items: center;
			position: absolute;
			top: 0;
			padding: 50px;
			background: none;
			clip-path: inset(0);
			z-index: 6;

			@media (min-width: 768px) {
				position: absolute;
			}
		}
	}
</style>
