<script lang="ts">
	import Layout from '../Components/Layout.svelte'
	import CheckBox from '../../../lib/components/Inputs/Checkbox.svelte'
	import { CheckPoint } from '$lib/TStypes/experiences'
	import { answer } from '$lib/utils/database/experience'

	export let checkPoint: CheckPoint
	export let myAnswer

	export let clear: false | true = false
	$: if (clear) myAnswers = new Array(checkPoint.CPOptions.length).fill(false)

	let myAnswers = new Array(checkPoint.CPOptions.length).fill(false)
	$: myAnswer = checkPoint.CPOptions.filter((item, i) => {
		if (myAnswers[i] === true) return item
	})
</script>

{#each checkPoint.CPOptions as label, i}
	<span class="self-baseline">
		<CheckBox bind:checked={myAnswers[i]}>{label}</CheckBox>
	</span>
{/each}
