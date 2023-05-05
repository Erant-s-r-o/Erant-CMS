import type { Handle, HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = async ({ error, event }) => {
	// you can capture the `error` and `event` from the client
	// but it only runs if the unexpected error comes from `+page.ts`
	console.log('client hook');
	console.log(error);

	return {
		// don't show sensitive data to the user
		message: 'Yikes! 💩'
	};
};

export const handle = (async ({ event, resolve }) => {
	console.log('handle');

	return await resolve(event);
}) satisfies Handle;
