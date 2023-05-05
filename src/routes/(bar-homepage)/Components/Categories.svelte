<script>
	import Category from './Category.svelte'
	import Headline from './Headline.svelte'
</script>

<div class="categories">
	<Headline content="Feeling Adventurous?" />
	<div class="options">
		<Category text="Beach" imgLink="" />
	</div>
</div>

<style lang="scss">
	.categories {
		width: calc(100% - 24px);
		margin: 0 0 20px auto;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		position: relative;

		@media screen and (max-width: 370px) {
			width: calc(100% - 12px);
		}

		.options {
			display: flex;
			flex-direction: row;
			gap: 24px;
			align-items: flex-start;
			justify-content: flex-start;
			text-align: center;
			max-height: 100px;
			max-width: 100%;
			overflow-y: hidden;
			overflow-x: scroll;
			scrollbar-width: none;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
</style>
