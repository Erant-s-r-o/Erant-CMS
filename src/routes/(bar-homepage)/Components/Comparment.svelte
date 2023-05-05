<script lang="ts">
	import { goto } from '$app/navigation';
	import CompartmentItem from './Compartment_Item.svelte';
	import Headline from './Headline.svelte';

	export let items = [];
	export let direction: 'col' | 'row' = 'row';
</script>

<div class="section">
	<Headline content="Inspiration on your trip" />

	<div class={`options ${direction === 'row' ? 'flex-row' : 'flex-col'}`}>
		{#each items as item}
			<CompartmentItem
				on:click={() => goto(`${item.ExpURL}`)}
				city={item.city}
				name={item.ExpName}
				image={item.ExpImage}
			/>
		{/each}
	</div>
</div>

<style>
	.section {
		width: calc(100% - 24px);
		margin: 0 0 20px auto;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		position: relative;
	}
	@media screen and (max-width: 370px) {
		.section {
			width: calc(100% - 12px);
		}
	}

	.section > .options {
		display: flex;
		gap: 12px;

		align-items: flex-start;
		justify-content: flex-start;

		text-align: center;
		max-width: 100%;

		overflow-y: hidden;
		overflow-x: scroll;

		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none;
	}

	.section > .options::-webkit-scrollbar {
		display: none;
	}
</style>
