<script lang="ts">
	import Input from '$lib/components/Inputs/Input.svelte';

	export let myAnswer = '';
	export let clear: false | true = false;
	$: if (clear) myAnswer = '';
</script>

<Input type="text" bind:value={myAnswer} class="w-full min-w-[400px] max-w-[500px] h-12" />
