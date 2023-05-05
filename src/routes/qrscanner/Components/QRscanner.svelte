<script>
	import { Html5Qrcode } from 'html5-qrcode'
	import { createEventDispatcher, onMount } from 'svelte'
	const dispatch = createEventDispatcher()
	let className = ''
	export { className as class }

	onMount(() => {
		const bodyHeight = document.body.offsetHeight
		const bodyWidth = document.body.offsetWidth
		const readerWidth = document.getElementById('reader').offsetWidth
		const readerHeight = document.getElementById('reader').offsetHeight
		const aspectRatio = readerWidth / readerHeight
		const reverseAspectRatio = readerHeight / readerWidth
		const mobileAspectRatio = reverseAspectRatio > 1.5 ? reverseAspectRatio + (reverseAspectRatio * 12) / 100 : reverseAspectRatio

		const config = {
			fps: 20,
			qrbox: { width: (3 / 4) * readerWidth, height: (1 / 2) * readerHeight },
			aspectRatio: bodyWidth < 600 ? mobileAspectRatio : aspectRatio,
		}

		const html5QrCode = new Html5Qrcode('reader')
		// @ts-ignore
		html5QrCode.start({ facingMode: 'environment' }, config, (text, result) => {
			html5QrCode.stop()
			dispatch('scan', {
				text,
				result,
			})
		})
	})
</script>

<div class={'w-full h-full flex absolute overflow-hidden ' + className}>
	<div id="reader" class="w-full h-full flex justify-center items-center overflow-hidden" />
	<div class="h-full w-full absolute">
		<slot />
	</div>
</div>

<style>
	@media only screen and (min-width: 600px) {
		#reader {
			transform: rotateY(180deg);
		}
	}
</style>
