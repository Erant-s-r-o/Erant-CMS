import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
	const { email, password } = await request.json();
	console.log(email, password);
	return json({});
}) satisfies RequestHandler;
