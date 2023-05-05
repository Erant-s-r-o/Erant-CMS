<script lang="ts">
	export let disabled: boolean = false

	let className = ''
	export { className as class }
</script>

<button {disabled} class={`bg-blue-500 rounded-xl text-white p-4 ${!disabled ? '' : 'bg-gray-500 text-white cursor-default'} ${className}`} on:click>
	<slot />
</button>
