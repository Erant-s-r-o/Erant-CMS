



<script>
	import Layout from '../Components/Layout.svelte'
	import Input from '../../../lib/components/Inputs/Input.svelte'
	let title = 'title' //exportovat ze zhora

	export let params // { type: 'interval', correct: [0, 3], quesion: 'text otazky', description: '', options: null },
	let myAnswer = ''
	export let control = null
	export let nextQuestion
	export let gameData

	function between(number, min, max) {
		return number >= min && number <= max
	}
</script>

<Layout
	imgSrc={gameData.question.thumbnail}
	{control}
	nextQuestion={() => {
		nextQuestion()
		myAnswer = ''
	}}
	on:submit={() => (control = myAnswer !== '' ? between(myAnswer, params.correct[0], params.correct[1]) : null)}
>
	<span slot="title">{title}</span>
	<span slot="about">{params.quesion}</span>
	<div slot="answers">
		<span class="self-baseline">
			<Input type="number" bind:value={myAnswer} class="w-full min-w-[400px] max-w-[500px] h-12" />
		</span>
	</div>
</Layout>
