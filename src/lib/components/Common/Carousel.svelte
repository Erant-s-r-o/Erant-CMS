<script>
	import { onMount } from 'svelte'
	// 420 px
	export var images = [
		'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
		'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
		'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
		'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
		'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
	]

	let default_index = 3

	let x = 0
	$: scrollProgress = parseFloat((x / width).toFixed(6))

	let width = null
	let height = null

	let func = 0.1

	let mp = [-3, -2, -1]
	let nav = []

	for (let i = 0; i < images.length + 3; i++) {
		mp.push(mp.at(-1) + 1)
	}

	for (let i = 0; i < images.length; i++) {
		if (i === 0) {
			nav.push({ status: 'active' })
		} else {
			nav.push({ status: 'wait' })
		}
	}

	let carousel

	onMount(() => {
		onLoad(carousel)
		window.onresize = () => {
			onLoad(carousel)
		}
	})
	function onLoad(self) {
		width = (self.getBoundingClientRect().width / 100) * 70
		height = ((self.getBoundingClientRect().width / 100) * 70) / 1.5
		images = images
		if (self.getBoundingClientRect().width < 440) {
			func = 0.05
		} else {
			func = 0.1
		}
	}
	function getWidth(x) {
		var res = width - width * 0.3 * Math.abs(x)
		if (res > 0) {
			return res
		} else {
			return 0
		}
	}
	function getMargin(x) {
		var m = 1000

		if (x <= -1.75) {
			x = -(1.75 + (x + 1.75))
			if (x >= 0) {
				x = 0
			}
		} else if (x >= 1.75) {
			x = 1.75 - (x - 1.75)
			if (x <= 0) {
				x = 0
			}
		}

		if (x > 0) {
			x = Math.abs(x)
			return 'margin-left: -' + m * func * x + 'px'
		} else if (x === 0) {
			return 'margin: 0px;'
		} else {
			x = Math.abs(x)
			return 'margin-right: -' + m * func * x + 'px'
		}
	}
	function zIndex(x) {
		if (x > -0.5 && x < 0.5) {
			return 2
		} else if ((x > -1.5 && x <= -0.5) || (x >= 0.5 && x < 1.5)) {
			return 1
		} else if (x <= -2.5 || x >= 2.5) {
			return -1
		} else {
			return 0
		}
	}
</script>

<div class="container">
	<div id="carousel" bind:this={carousel} on:scroll={() => (x = carousel.scrollLeft)} style="height: {height}px;">
		<div class="sticky">
			{#each Array(default_index) as _, index (index)}
				<div
					class="item fake"
					style="
                            display: {mp.at(index) - scrollProgress <= -3.5 || mp.at(index) - scrollProgress > 3.5 ? 'none' : 'block'}; 
                            min-width: {getWidth(mp.at(index) - scrollProgress)}px; 
                            max-width: {getWidth(mp.at(index) - scrollProgress)}px; 
                            min-height: {height + height * (-func * (mp.at(index) - scrollProgress) * (mp.at(index) - scrollProgress))}px;
                            z-index: {zIndex(mp.at(index) - scrollProgress)};
                            {getMargin(mp.at(index) - scrollProgress)};"
				/>
			{/each}

			{#each images as image, index (index)}
				<div
					class="item real"
					style="text-align:center;
                            display: {mp.at(index + default_index) - scrollProgress <= -3.5 || mp.at(index + default_index) - scrollProgress > 3.5 ? 'none' : 'block'}; 
                            min-width: {getWidth(mp.at(index + default_index) - scrollProgress)}px; 
                            max-width: {getWidth(mp.at(index + default_index) - scrollProgress)}px; 
                            z-index: {zIndex(mp.at(index + default_index) - scrollProgress)};
                            {getMargin(mp.at(index + default_index) - scrollProgress)}"
				>
					<img alt="" src={image} />
				</div>
			{/each}

			{#each Array(3) as _, index (index)}
				<div
					class="item fake"
					style="
                            display: {mp.at(-default_index + index) - scrollProgress <= -3.5 || mp.at(-default_index + index) - scrollProgress > 3.5 ? 'none' : 'block'}; 
                            min-width: {getWidth(mp.at(-default_index + index) - scrollProgress)}px;
                            max-width: {getWidth(mp.at(-default_index + index) - scrollProgress)}px;
                            min-height: {height + height * (-func * (mp.at(-default_index + index) - scrollProgress) * (mp.at(-default_index + index) - scrollProgress))}px;
                            z-index: {zIndex(mp.at(-default_index + index) - scrollProgress)};
                            {getMargin(mp.at(-default_index + index) - scrollProgress)}"
				/>
			{/each}
			<div class="overlay" />
		</div>
		{#each Array(images.length - 1) as _}
			<div class="scroll-guide" style="min-width: {width}px; min-height: 10px; scroll-snap-align: start end;" />
		{/each}
	</div>

	<div class="slide-navigation">
		{#each Array(images.length) as _, index (index)}
			{#if Math.round(scrollProgress) == index}
				<span class="active" />
			{:else}
				<span />
			{/if}
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#carousel {
		margin-top: 20px;
		margin-bottom: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		max-width: 100%;
		min-width: 100%;
		width: 100%;
		position: relative;

		scroll-snap-type: x mandatory;
		overflow-x: scroll;
		scroll-behavior: auto;
	}
	/* Hide scrollbar for Chrome, Safari and Opera */
	#carousel::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	#carousel {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	#carousel > .sticky {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		position: sticky;
		left: 0;
		top: 0;

		gap: 0px;

		min-width: 100%;
		max-width: 100%;
		width: 100%;
		overflow: hidden;
		scroll-snap-align: end;
	}

	#carousel > .sticky > .item {
		border-radius: 10px;
		min-width: 0;
		color: white;
		overflow: hidden;
	}

	#carousel > .sticky > .overlay {
		position: absolute;
		left: 0px;
		top: 0;

		width: 100%;
		height: 100%;
		/* Mask */

		background: linear-gradient(
			270deg,
			rgba(255, 255, 255, 0.6) 0%,
			rgba(255, 255, 255, 0.1) 20%,
			rgba(255, 255, 255, 0) 40%,
			rgba(255, 255, 255, 0) 50.56%,
			rgba(255, 255, 255, 0) 60%,
			rgba(255, 255, 255, 0.1) 80%,
			rgba(255, 255, 255, 0.6) 100%
		);
		transform: matrix(1, 0, 0, -1, 0, 0);
		z-index: 10;
	}

	#carousel > .sticky > .real {
		display: flex;
		align-items: stretch;
		justify-content: stretch;
		position: relative;
	}

	#carousel > .sticky > .real > img {
		flex-grow: 1;
	}

	#carousel > .sticky > .fake {
		background-color: white;
	}

	.slide-navigation {
		height: fit-content;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		gap: 5px;
		width: 80px;
	}

	.slide-navigation > span {
		width: 6px;
		height: 6px;
		border-radius: 6px;
		background-color: #999999;
	}

	.slide-navigation > .active {
		background-color: #7b61ff;
	}
</style>
