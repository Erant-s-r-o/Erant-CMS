<script>
	export let src
	let className
	export { className as class }
</script>

<section class={className} style="--bg: url({src});" />

<style lang="scss">
	section {
		border-radius: 26px;
		background-image: var(--bg);
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
