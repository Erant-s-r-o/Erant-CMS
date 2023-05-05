<script>
</script>

<div class="cover h-14">
	<div class="h-14 w-14 flex justify-center items-center">
		<input type="range" min="1" max="11" step="2" />
	</div>
	<span><slot /></span>
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

		span {
			font-size: 100%;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			font-size: 140%;
		}
	}
	/*border: 4px solid var(--blue);
			box-shadow: 0 0 4px var(--blue), 0 0 1px var(--blue) inset;
			border-radius: var(--border-radius);*/
</style>
