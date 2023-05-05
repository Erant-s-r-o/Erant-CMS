import appwriteNode from '$lib/server/appwriteNode/appwriteNode.js';
import { getUserProgress, loadExperience } from '$lib/server/database/experience.js';

export const load = async ({ params, locals }) => {
	appwriteNode.set(locals.appwriteClients.user);

	const exp = await loadExperience(params.gameurl);
	const prog = await getUserProgress(exp.$id, locals.user.$id);

	return {
		experience: exp,
		userProgress: prog
	};
};
