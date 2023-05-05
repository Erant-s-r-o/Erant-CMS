<script>
	export let style = ''
	export let title = ''

	let className = ''
	export { className as class }
</script>

<section class={className} {style}>
	<h2><slot name="title">{title}</slot></h2>
	<div><slot /></div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		row-gap: 20px;
		width: 100%;

		h2 {
			font-style: normal;
			font-weight: 600;
			font-size: 24px;
			line-height: 30px;
			color: #110042;
		}

		div {
			font-style: normal;
			font-weight: 400;
			font-size: 20px;
			line-height: 25px;
		}
	}
</style>
