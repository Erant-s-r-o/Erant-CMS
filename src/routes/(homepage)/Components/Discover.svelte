<script>
	import { goto } from '$app/navigation';
</script>

<div class="discover">
	<h2>Dicoveries around</h2>

	<button on:click={() => goto('/explore')}> Start your trips! </button>
</div>

<style>
	/*min 370px*/
	.discover {
		background-color: #110042;
		color: white;

		width: calc(100% - 48px);
		height: 124px;

		border-radius: 32px;

		margin: 0px auto 0px auto;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 18px;
	}

	.discover > h2 {
		font-family: 'Source Sans Pro';
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 32px;
		margin: 0;
		text-align: center;
	}
	.discover > button {
		text-align: center;
		color: #110042;
		background-color: #ffffff;

		font-family: 'Source Sans Pro';
		font-style: normal;
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;
		padding: 8px 55px 8px 55px;

		border-radius: 15px;
	}

	.discover > button:hover,
	.discover > button:active {
		opacity: 80%;
		cursor: pointer;
	}

	@media screen and (max-width: 370px) {
		.discover {
			width: calc(100% - 24px);
			height: 33.5vw;
			border-radius: 8vw;
		}
		.discover > button {
			font-size: 4.3vw;
			line-height: 5.4vw;
			padding: 2.2vw 14.8vw 2.2vw 14.8vw;
			border-radius: 15px;
		}
		.discover > h2 {
			font-size: 6.4vw;
			line-height: 8.6vw;
		}
	}
</style>
