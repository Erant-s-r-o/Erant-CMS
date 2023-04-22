<script lang="ts">
	import { user } from '$lib/appwrite'
	import Loading from '$lib/components/Common/Loading.svelte'
	import { navigate } from '$lib/router'

	export let params

	//register email verification
	const urlParams = new URLSearchParams(location.search)
	const userId = urlParams.get('userId')
	const secret = urlParams.get('secret')
	;(async () => {
		try {
			await user.updateVerification(userId, secret)
			navigate(`/create/account/${params.erantId}`)
		} catch (err) {
			navigate('/')
		}
	})()
</script>

<div class="w-full h-full flex items-center justify-center">
	<Loading />
</div>
