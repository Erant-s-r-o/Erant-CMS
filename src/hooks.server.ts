import { error, HandleServerError, type Handle } from '@sveltejs/kit';
import appwriteNode, { account } from './lib/server/appwriteNode/appwriteNode';
import { Client } from 'node-appwrite';
import user from '$lib/server/users/user';

const routesWithoutAuthorization = ['/(authorization)/login'];

const adminAppwriteClient = new Client()
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
	.setKey(import.meta.env.API_KEY_SECRET);

export const handle = (async ({ event, resolve }) => {
	if (event.route.id && routesWithoutAuthorization.indexOf(event.route.id) >= 0) {
		return await resolve(event);
	}
	const jwt: string = event.cookies.get('appwriteSession');

	if (!jwt) {
		const userId = (await user.getByJWT(jwt)).$id;
		jwt = 
	}

	const userAppwriteClient = appwriteNode.setJWT(jwt);
	event.locals.user = await account.get();
	event.locals.appwriteClients = {
		admin: adminAppwriteClient,
		user: userAppwriteClient
	};

	return await resolve(event);
}) satisfies Handle;

export const handleError: HandleServerError = async ({ error, event }) => {
	// you can capture the `error` and `event` from the client
	// but it only runs if the unexpected error comes from `+page.ts`
	console.log('server hook');
	console.log(error);

	return {
		// don't show sensitive data to the user
		message: 'Yikes! 💩'
	};
};
