<script lang="ts">
	import { navigate } from '$lib/router'
	import ArrowBack from '$lib/svg/ArrowBack.svelte'
</script>

<div class="w-full h-auto flex flex-wrap flex-col">
	<button
		class="absolute mt-4 z-50"
		on:click={() => {
			navigate(-1)
		}}
	>
		<ArrowBack />
	</button>
	<slot />
</div>
