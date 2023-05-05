<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	let className = ''
	export { className as class }
	let value = ''
</script>

<div class={'h-auto w-full relative flex justify-center gap-4 flex-wrap flex-col items-center p-[20px] ' + className}>
	<div class="h-[300px] w-[300px] max-w-[75vw] rounded-[20px] bg-white flex justify-center items-center">
		<!--image-->
	</div>
	<input bind:value type="text" placeholder="The code..." class="block p-3 border rounded-[15px] h-[52px] max-w-[75vw] w-[383px] mt-4" />
	<button class="w-[383px] max-w-[75vw] rounded-[15px] bg-white z-10 h-[52px] bg-[#4263EB] text-white text-[24px]" on:click={() => dispatch('submit', value)}>Continue</button>
</div>
