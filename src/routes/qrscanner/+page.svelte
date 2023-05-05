<script lang="ts">
	import ScanFrame from './Components/ScanFrame.svelte';
	import InfoBar from './Components/InfoBar.svelte';
	import QRscanner from './Components/QRscanner.svelte';
	import SwitchBar from './Components/SwitchBar.svelte';
	import QRinput from './Components/QRinput.svelte';
	import { navigate } from 'svelte-routing';

	let switched = 'scan';
</script>

<div class="w-full h-full relative">
	{#if switched === 'scan'}
		<div class="h-auto w-full justify-center flex flex-wrap flex-row">
			<InfoBar class="mt-[40px] top-0 relative z-10" on:click={() => window.history.back()}
				>Scan our QR code or type in code to load the experience</InfoBar
			>
			<QRscanner on:scan={(e) => navigate(`/${e.detail.text}`)}>
				<div
					class="h-full w-full relative flex justify-center gap-4 flex-wrap flex-row items-center"
				>
					<ScanFrame />
				</div>
			</QRscanner>
			<SwitchBar
				{switched}
				on:switch={(e) => (switched = e.detail)}
				class="mb-[40px] bottom-0 max-w-[95%] absolute z-10"
			/>
		</div>
	{:else if switched === 'input'}
		<div class="h-max min-h-full w-full bg-[#3A3A3A] justify-center flex flex-wrap flex-row">
			<InfoBar class="mt-[40px] top-0 relative z-10" on:click={() => window.history.back()}
				>Type code or type in code to load the experience</InfoBar
			>
			<QRinput class="mb-[40px]" on:submit={(e) => navigate(e.detail)} />
			<SwitchBar
				{switched}
				on:switch={(e) => (switched = e.detail)}
				class="mb-[40px] mt-auto bottom-0 max-w-[95%] relative z-10"
			/>
		</div>
	{/if}
</div>

<style>
	:global(#qr-shaded-region) {
		display: none !important;
	}
</style>
