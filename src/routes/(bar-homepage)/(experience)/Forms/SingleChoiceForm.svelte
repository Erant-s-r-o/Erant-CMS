<script lang="ts">
	import type { CheckPoint } from '$lib/TStypes/experiencesTypes';
	import Radio from '$lib/components/Inputs/Radio.svelte';

	export let checkPoint: CheckPoint;
	export let myAnswer = '';

	export let clear: false | true = false;
	$: if (clear) myAnswer = '';
</script>

{#each checkPoint.CPOptions as label}
	<span class="self-baseline">
		<Radio value={label} bind:group={myAnswer}>{label}</Radio>
	</span>
{/each}
