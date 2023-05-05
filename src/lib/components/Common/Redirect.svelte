<script>
	import { onMount } from 'svelte'
	import { navigate } from 'svelte-routing'

	export let to = '/'
	export let replace = false

	onMount(() => navigate(to, { replace }))
</script>
