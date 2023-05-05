<script>
	import { idGenerator } from '../../utils/IdGenerator'
	const id = idGenerator()

	export let group = ''
	export let value
</script>

<div class="cover h-14 cursor-pointer">
	<div class="h-14 w-14 flex justify-center items-center">
		<input {id} bind:group {value} type="radio" class="w-6 h-6 absolute flex justify-center items-center text-red-600 bg-gray-100 border-gray-300" />
	</div>
	<label for={id}><slot /></label>
</div>

<style lang="scss">
	.cover {
		height: 100%;
		width: fit-content;
		background: white;
		display: grid;
		grid-template-columns: 56px auto;
		gap: 20px;
		padding: 4px;

		label {
			font-size: 100%;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			font-size: 140%;
		}
		input:checked {
			appearance: none;
			background-color: var(--blue);
			border-radius: 100%;
			border: 2px solid black;
		}
		input:checked::before {
			content: '';
			height: 40%;
			width: 40%;
			background: black;
			position: absolute;
			border-radius: 100%;
		}
	}
	/*border: 4px solid var(--blue);
			box-shadow: 0 0 4px var(--blue), 0 0 1px var(--blue) inset;
			border-radius: var(--border-radius);*/
</style>
