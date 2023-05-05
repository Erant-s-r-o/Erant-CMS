<script lang="ts">
	import { browser } from '$app/environment';
	import { Alert, Button } from 'flowbite-svelte';
	export let granted: false | true | null = null;

	if (browser) {
		navigator.geolocation.getCurrentPosition(
			() => {
				granted = true;
			},
			() => {
				granted = false;
			}
		);
	}
</script>

{#if granted === false}
	<div class="w-full justify-center flex absolute">
		<Alert class="w-[95%] max-w-[400px] z-50 mt-4" color="green">
			<span class="text-lg font-medium">This is a info alert</span>
			<div slot="extra">
				<div class="mt-2 mb-4 text-sm">
					To advance through your experience you need to enable the location access,
					without it the app won't work.
				</div>
				<div class="flex gap-2">
					<Button color="green" on:click={() => (granted = true)} size="xs">ok</Button>
				</div>
			</div>
		</Alert>
	</div>
{/if}
<!--{#if state === 'granted'}
	<script>
	  import { onMount } from 'svelte';
	  onMount(() => {
		dispatch('locationGranted');
	  });
	</script>
  {/if} -->
