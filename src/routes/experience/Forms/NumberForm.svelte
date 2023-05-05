<script lang="ts">
	import Input from '../../../lib/components/Inputs/Input.svelte'
	import { CheckPoint } from '$lib/TStypes/experiences'
	import { answer } from '$lib/utils/database/experience'

	export let myAnswer = ''
	export let clear: false | true = false
	$: if (clear) myAnswer = ''
</script>

<Input type="number" bind:value={myAnswer} class="w-full min-w-[400px] max-w-[500px] h-12" />
