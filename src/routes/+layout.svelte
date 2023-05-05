<script lang="ts">
	import cookie from '$lib/utils/cookie';
	import '../app.css';
	import '../main.scss';

	setInterval(() => {
		//  cookie.set()
	}, 1000 * 60 * 10);
</script>

<main class="w-full h-full">
	<slot />
</main>
