import collections from '$lib/server/collections';
import type { Models } from 'appwrite';
import type { LayoutServerLoad } from './$types';
import type { Account } from '$lib/TStypes/usersTypes';
import { Query } from 'node-appwrite';

export const load = (async ({ locals }) => {
	if (!locals?.user) return { user: locals?.user };
	const userInfo = await collections.users.getDocument<Models.Document & Account>([
		Query.equal('userId', '64039963680eb22aef72')
	]);
	return {
		user: userInfo
	};
}) satisfies LayoutServerLoad;
