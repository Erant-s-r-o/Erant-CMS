import {
	Client,
	Teams,
	Functions,
	Locale,
	Avatars,
	Graphql,
	Account,
	Storage,
	Databases,
	Users
} from 'node-appwrite';
import database from './database';

let appwriteClient = new Client();
appwriteClient
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

//jwt is needed//.setJWT();

let teams = new Teams(appwriteClient);
let functions = new Functions(appwriteClient);
let locale = new Locale(appwriteClient);
let avatars = new Avatars(appwriteClient);
let graphql = new Graphql(appwriteClient);
let account = new Account(appwriteClient);
let databases = new Databases(appwriteClient);
let storage = new Storage(appwriteClient);
let users = new Users(appwriteClient);
let Collection = database(databases);

export default {
	...appwriteClient,
	set: (client: Client) => {
		appwriteClient = client;
		reloadClient();
		return appwriteClient;
	},
	setJWT: (jwt: string) => {
		return appwriteClient.setJWT(jwt);
	},
	setKey: (key: string) => {
		return appwriteClient.setKey(key);
	}
}; //provide jwt

const reloadClient = () => {
	teams = new Teams(appwriteClient);
	functions = new Functions(appwriteClient);
	locale = new Locale(appwriteClient);
	avatars = new Avatars(appwriteClient);
	graphql = new Graphql(appwriteClient);
	account = new Account(appwriteClient);
	databases = new Databases(appwriteClient);
	storage = new Storage(appwriteClient);
	users = new Users(appwriteClient);
	Collection = database(databases);
};
/*
export default (client: Client) => {
	appwriteClient= client
	const databases = new Databases(appwriteClient)
	const teams = new Teams(appwriteClient)
const functions = new Functions(appwriteClient)
const locale = new Locale(appwriteClient)
const avatars = new Avatars(appwriteClient)
const graphql = new Graphql(appwriteClient)
const account = new Account(appwriteClient)
const databases = new Databases(appwriteClient)
const storage = new Storage(appwriteClient)
const users = new Users(appwriteClient)
}*/

export {
	appwriteClient as client,
	teams,
	functions,
	locale,
	avatars,
	graphql,
	account,
	databases,
	storage,
	Collection,
	users
};
