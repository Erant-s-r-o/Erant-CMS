<script lang="ts">
	import { Alert } from 'flowbite-svelte'
	export let color: 'red' | 'yellow' | 'green' | 'purple' | 'pink' | 'blue' | 'light' | 'dark' = 'green'
	export let dismissable = false

	let className = ''
	export { className as class }
</script>

<Alert {...$$restProps} {dismissable} class="mt-4 ml-2 mr-2 absolute top-0 z-50 {className}" {color}>
	<span slot="icon"><slot name="icon" {color} /></span>
	<span class="text-lg font-medium"><slot name="title" {color} /></span>
	<div slot="extra">
		<div class="mt-2 mb-4 text-sm">
			<slot {color} />
		</div>
		<div class="flex gap-2">
			<slot name="buttons" {color} />
		</div>
	</div>
</Alert>
