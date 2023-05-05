<script>
	let className = ''
	export { className as class }
</script>

<div class={'w-full h-auto flex flex-wrap flex-row justify-normal items-center gap-4 ' + className}>
	<slot />
</div>
