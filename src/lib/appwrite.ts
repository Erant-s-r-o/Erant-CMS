import {
	Client,
	Teams,
	Functions,
	Locale,
	Avatars,
	Graphql,
	Account,
	Storage,
	Databases
} from 'appwrite';
import {
	createAuthDispatcher,
	createBucketDispatcher,
	createCollectionDispatcher
} from 'svelte-appwrite-client';
import cookie from './utils/cookie';

const client = new Client();
client
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const teams = new Teams(client);
const functions = new Functions(client);
const locale = new Locale(client);
const avatars = new Avatars(client);
const graphql = new Graphql(client);
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

const Auth = createAuthDispatcher(account);
const Bucket = createBucketDispatcher(storage);
const Collection = createCollectionDispatcher(databases);

//type AuthType = Awaited<ReturnType<typeof createAuthDispatcher>>;

const user = new Auth();
const isLoading = user?.isLoading;

export const erant = {
	createEmailSession: async (email: string, password: string) => {
		await user.createEmailSession(email, password);
		const { jwt } = await user.createJWT();
		cookie.set('appwriteSession', jwt, 1 / 24 / 4);
	}
};
export default client;
export {
	client,
	teams,
	functions,
	locale,
	avatars,
	graphql,
	account,
	databases,
	storage,
	Bucket,
	Collection,
	user,
	isLoading
};
