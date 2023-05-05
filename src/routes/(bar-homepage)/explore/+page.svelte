<script lang="ts">
	import NavigationBarLayout from '../../lib/components/Layouts/NavigationBarLayout.svelte';
	import Result from './Components/Result.svelte';
	import Top from './Components/Top.svelte';
	import { getExperiences } from '$lib/utils/database/experience';
	import Loading from '$lib/components/Common/Loading.svelte';
	import Comparment from '../(homepage)/Components/Comparment.svelte';

	let Search: string;
	//
</script>

<div class="content">
	<Top bind:search_value={Search} />

	<div class="results">
		{#await getExperiences()}
			<div class="w-full h-24 flex items-center justify-center">
				<Loading />
			</div>
		{:then expiriences}
			<Comparment direction="col" items={expiriences} />
		{/await}

		<div class="end" />
	</div>
</div>

<style lang="scss">
	.content {
		width: 100%;
		height: 100%;
		max-height: 100vh;
		overflow-y: scroll;

		.results {
			width: 100%;
			height: 60vh;

			position: relative;
			padding: 16px 16px 0px 16px;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 16px;

			.end {
				width: 20px;
				min-height: 10vh;
			}
		}
	}
</style>
