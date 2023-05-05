<script>
	import Eye from '../../svg/Eye.svelte'

	export let name = ''
	export let placeholder = ''
	export let value = ''

	export let input = null
	let vissible = false

	function changeVisibility(i) {
		if (!vissible) {
			i.type = 'text'
			vissible = true
		} else {
			i.type = 'password'
			vissible = false
		}
	}
</script>

<div>
	<input bind:value bind:this={input} type="password" {name} {placeholder} minlength="8" class="input" required />
	<button type="button" on:click={changeVisibility(input)}>
		<Eye active={vissible} />
	</button>
</div>

<style lang="scss">
	div {
		width: 100%;
		position: relative;
		button {
			position: absolute;
			right: 25px;
			top: 50%;
			transform: translateY(-50%);
		}
		button:hover {
			opacity: 50%;
		}
	}

	.input {
		width: calc(100%);
		padding: 12px 24px;
		border-radius: 15px;
		background-color: #eeeeee;
		font-size: 18px;
		font-family: 'Source Sans Pro';
		font-style: normal;
		font-weight: 600;
		line-height: 28px;
		@media screen and (max-height: 720px) {
			padding: 8px 24px;
		}
	}
	::placeholder {
		color: #8f8f8f;
		font-size: 18px;
		font-family: 'Source Sans Pro';
		font-style: normal;
		font-weight: 600;
		line-height: 28px;
	}
</style>
