<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	let className = '';
	export { className as class };
	const dispatch = createEventDispatcher();

	export let switched: 'scan' | 'input' = 'scan';
	$: dispatch('switch', switched);
</script>

{#if switched === 'scan'}
	<div
		class={'h-[80px] w-[340px] max-w-[95%] bg-[#282828] p-[8px] flex flex-wrap flex-col gap-[8px] rounded-[30px] ' +
			className}
	>
		<button class="rounded-[20px] bg-[#4263EB] text-white h-full"> Scan QR </button>
		<button
			on:click={() => (switched = 'input')}
			class="rounded-[20px] bg-[#282828] text-[#8A8A8A] h-full"
		>
			Type in code
		</button>
	</div>
{:else if switched === 'input'}
	<div
		class={'h-[80px] w-[340px] max-w-[95%] bg-[#282828] p-[8px] flex flex-wrap flex-col gap-[8px] rounded-[30px] ' +
			className}
	>
		<button
			on:click={() => (switched = 'scan')}
			class="rounded-[20px] bg-[#282828] text-[#8A8A8A] h-full"
		>
			Scan QR
		</button>
		<button class="rounded-[20px] bg-[#4263EB] text-white h-full"> Type in code </button>
	</div>
{/if}
