<script>
	const col = {
		blue: '#4263EB',
		white: 'white',
		txt_blue: 'white',
		txt_white: '#999999',
	}
	export let background
</script>

<div class="bubble" style={`background: ${col[background]}; color: ${col[`txt_${background}`]}`}>
	<slot name="icon" />
	<span class="text"><slot /></span>
</div>

<style>
	.bubble {
		border-radius: 20px;
		width: fit-content;
		height: 38px;
		display: flex;
		align-items: center;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 6px 10px;
		gap: 10px;
		border: 1px solid #4263eb;
		font-size: 17px;
		color: white;
	}
	.text {
		font-family: 'Source Sans Pro';
		font-style: normal;
		font-weight: 700;
		font-size: 20px;
		line-height: 25px;
		display: flex;
		align-items: center;
		text-align: center;
	}
</style>
