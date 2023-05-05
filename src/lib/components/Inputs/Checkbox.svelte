<script>
	import { idGenerator } from '$lib/utils/IdGenerator'
	const id = idGenerator()

	export let checked = true
</script>

<div class="cover h-14">
	<div class="h-14 w-14 flex justify-center items-center">
		<input
			{id}
			bind:checked
			type="checkbox"
			class="relative w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-[#96ddff] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-[#96ddff] focus:ring-[#96ddff] ring-offset-white focus:outline-none appearance-none before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-[var(--blue)] before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-20"
		/>
	</div>
	<label for={id}><slot /></label>
</div>

<style>
	.cover {
		height: 100%;
		width: fit-content;
		background: white;
		display: grid;
		grid-template-columns: 56px auto;
		gap: 20px;
		padding: 4px;
	}

	label {
		font-size: 100%;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		font-size: 140%;
	}
</style>
