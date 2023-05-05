// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { Client } from 'node-appwrite';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: Models.Account<Models.Preferences>;
			appwriteClients: {
				admin: Client;
				user: Client;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
