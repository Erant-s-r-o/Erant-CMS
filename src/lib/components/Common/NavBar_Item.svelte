<script lang="ts">
	export let active: boolean = false
	export let name: string = ''
</script>

<button on:click>
	<slot />
	{#if active}
		<p class="active" style="color:#4263EB">{name}</p>
	{:else}
		<p>{name}</p>
	{/if}
</button>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@500&display=swap');
	button {
		height: 54px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4px;
	}

	button:hover,
	button:active {
		opacity: 70%;
	}

	button > p {
		font-family: 'Work Sans';
		font-style: normal;
		font-weight: 500;
		font-size: 11px;
		line-height: 16px;

		text-align: center;
		color: #61646b;
	}
</style>
