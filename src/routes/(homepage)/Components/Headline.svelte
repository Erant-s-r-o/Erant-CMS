<script>
    export let content = ""
</script>

<h1>
    {content}
</h1>

<style>
    h1{
		font-family: 'Source Sans Pro';
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 30px;
		text-align: left;
		margin-top: 0;
	}
	@media screen and (max-width: 370px)
	{
		h1 {
			font-size: 6.4vw;
    		line-height: 8.6vw;
		}
	}
	@media screen and (max-width: 300px)
	{
		h1 {
			font-size: 19px;
    		line-height: 25px;
		}
	}
</style>