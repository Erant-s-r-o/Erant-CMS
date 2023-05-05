<script lang="ts">
	import CheckBox from '$lib/components/Inputs/Checkbox.svelte';
	import { CheckPoint } from '$lib/TStypes/experiencesTypes';

	export let checkPoint: CheckPoint;
	export let myAnswer;

	let myAnswers = new Array(checkPoint.CPOptions.length).fill(false);
	export let clear = false;
	$: if (clear) myAnswers = new Array(checkPoint.CPOptions.length).fill(false);
	$: myAnswer = checkPoint.CPOptions.filter((item, i) => {
		if (myAnswers[i] === true) return item;
	});
</script>

{#each checkPoint.CPOptions as label, i}
	<span class="self-baseline">
		<CheckBox bind:checked={myAnswers[i]}>{label}</CheckBox>
	</span>
{/each}
