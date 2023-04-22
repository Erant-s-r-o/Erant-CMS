<script lang="ts">
	import { user } from '$lib/appwrite'
	import collections from '$lib/collections'
	import Loading from '$lib/components/Common/Loading.svelte'
	import { navigate } from '$lib/router'
	import { Permission, Role } from 'appwrite'
	export let params
	;(async () => {
		await collections.users.createDocument(
			{
				erantId: params.erantId,
				userName: $user.name,
				userId: $user.$id,
				termsAccepted: true,
			},
			[Permission.delete(Role.user($user.$id)), Permission.update(Role.user($user.$id)), Permission.read(Role.users('verified'))],
		)
		navigate('/')
	})()
</script>

<div class="w-full h-full flex items-center justify-center">
	<Loading />
</div>
