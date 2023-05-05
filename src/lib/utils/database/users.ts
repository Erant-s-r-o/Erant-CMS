import { databases } from '$lib/appwrite'
import { Query } from 'appwrite'

export const getUserByErantId = async (erantId: string) => {
	return (await databases.listDocuments('63ded6c18e8493bffc83', 'Users', [Query.equal('erantId', erantId)])).documents[0]
}
