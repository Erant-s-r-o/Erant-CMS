<script lang="ts">
	import { navigate } from 'svelte-routing'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let href: string = ''
	export let disabled: boolean = false
	export let primary: boolean = false
	export let style: string = ''

	let className = ''
	export { className as class }
</script>

<button {disabled} class:disabled {style} on:click={() => navigate(href)} on:click={() => dispatch('submit', true)} on:click class={className} class:primary>
	<slot />
</button>

<style lang="scss">
	button {
		border-radius: 25px;
		cursor: pointer;
		display: inline-block;
		font-size: 30px;
		font-weight: 600;
		line-height: 20px;
		padding: 20px;
		text-align: center;
		outline: none;
		box-shadow: none;
		border: none;
		transition: background-color 0.3s;

		background-color: rgb(232, 232, 232);
		color: #4263eb;

		word-break: break-word;
		overflow: auto;

		&.primary {
			color: white;
			background-color: rgb(66, 99, 235);

			&.disabled {
				&:hover {
					background-color: rgb(107 114 128);
				}
			}
			&:hover {
				background-color: rgba(66, 99, 235, 0.8);
			}
		}

		&:hover {
			background-color: rgb(232, 232, 232, 0.8);
		}
		&.disabled {
			background: rgb(107 114 128);
			color: white;
			cursor: default;
		}
	}
</style>
