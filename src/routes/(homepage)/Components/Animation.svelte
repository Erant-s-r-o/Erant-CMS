<script>
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
  
	let controlsLayout = [
	  'previousFrame',
	  'playpause',
	  'stop',
	  'nextFrame',
	  'progress',
	  'frame',
	  'loop',
	  'spacer',
	  'background',
	  'snapshot',
	  'zoom',
	  'info',
	];
  </script>
  
  <LottiePlayer
	src="/animation/ERANT.json"
	autoplay="{true}"
	loop="{true}"
	controls="{true}"
	renderer="svg"
	background="transparent"
	style="width: 100%; height: 100%"
	speed="2.5"
	controlsLayout="{controlsLayout}"
  />
<!--<svelte:head>
	<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" ></script>
</svelte:head>

<lottie-player src="/animation/ERANT.json"  background="transparent"  speed="1"   autoplay>

</lottie-player>
-->
