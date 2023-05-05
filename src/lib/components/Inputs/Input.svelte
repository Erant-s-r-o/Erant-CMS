<script lang="ts">
	import elementIdGenerator from '$lib/utils/elementIdGenerator'
	import { Input } from 'flowbite-svelte'

	export let value: string = ''
	export let focus = false
	export let prefix: string = ''
	export let placeholder: string = ''
	export let autocomplete: string = ''
	const id = elementIdGenerator()
	export let type:
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'reset'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week'
		| 'search'
		| 'textarea' = 'text'

	let className = 'bg-white text-black border-4 border-blue-300 rounded-[25px] text-left text-[30px] p-[16px] outline-none appearance-none w-full'
	export { className as class }

	const setType = (node: HTMLInputElement) => {
		node.type = type
	}

	const setFocus = (node: HTMLInputElement | HTMLTextAreaElement) => {
		focus && node.focus()
	}

	$: if (prefix && !value.startsWith(prefix)) value = `${prefix}${value}`
</script>

{#if type === 'textarea'}
	<textarea {id} {placeholder} use:setFocus bind:value class={className} {...$$restProps} />
{:else}
	<input {autocomplete} {id} {placeholder} class:prefixPlaceholder={prefix.length === value.length} class={'' + className} use:setType use:setFocus bind:value {...$$restProps} />
{/if}

<style>
	input::placeholder {
		color: #8f8f8f;
		font-size: 18px;
		font-family: 'Source Sans Pro';
		font-style: normal;
		font-weight: 600;
		line-height: 28px;
	}
</style>
