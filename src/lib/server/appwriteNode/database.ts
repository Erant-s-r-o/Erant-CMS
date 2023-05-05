import { Databases, ID, Models, Query } from 'node-appwrite';

type DatabaseValueTypes = string | number | string[] | number[];

export default (databases: Databases) => {
	//const client = databases.client

	return class Collection<GlobalTypeOfData extends Models.Document> {
		constructor(public databaseId: string, public collectionId: string) {
			this.databaseId = databaseId;
			this.collectionId = collectionId;
		}

		//create document with node-appwrite
		createDocument<TData extends GlobalTypeOfData>(
			data: { [key: string]: DatabaseValueTypes } = {},
			permissions: string[] | undefined = undefined,
			id: string = ID.unique()
		) {
			return databases.createDocument<TData>(
				this.databaseId,
				this.collectionId,
				id,
				data,
				permissions
			);
		}

		//update document with node-appwrite
		updateDocument<TData extends GlobalTypeOfData>(
			documentId: string | Models.Document,
			data: { [key: string]: DatabaseValueTypes } = {},
			permissions: string[] | undefined = undefined
		) {
			return databases.updateDocument<TData>(
				this.databaseId,
				this.collectionId,
				typeof documentId === 'string' ? documentId : documentId.$id,
				data,
				permissions
			);
		}

		//delete document with node-appwrite
		deleteDocument(documentId: string | GlobalTypeOfData) {
			return databases.deleteDocument(
				this.databaseId,
				this.collectionId,
				typeof documentId === 'string' ? documentId : documentId.$id
			);
		}

		//get document with node-appwrite
		async getDocument<TData extends GlobalTypeOfData>(documentId: string | string[]) {
			let data: TData;
			if (typeof documentId === 'string') {
				data = await databases.getDocument<TData>(
					this.databaseId,
					this.collectionId,
					documentId
				);
			} else {
				const list = await databases.listDocuments<TData>(
					this.databaseId,
					this.collectionId,
					documentId
				);

				if (list.total < 1) throw new Error('Document that matches the query not found');
				if (list.total > 1)
					throw new Error(
						'Multiple documents found, use listDocuments instead or try to be more specific in your query'
					);
				data = list.documents[0];
			}
			return data;
		}

		//list documents with node-appwrite
		listDocuments<TData extends GlobalTypeOfData>(
			filters: string[] = [],
			offset = 0,
			limit = -1,
			orderType: 'ASC' | 'DESC' | null = null
		) {
			if (Number.isInteger(offset) === false)
				throw new TypeError('offset must be a non-negative integer');
			if (offset < 0) throw new TypeError('limit must be a non-negative integer');
			if (Number.isInteger(limit) === false)
				throw new TypeError('limit must be a non-negative integer or -1');
			if (limit < -1) throw new TypeError('limit must be a non-negative integer or -1');

			const queries = [...filters];
			if (offset > 0) queries.push(Query.offset(offset));
			if (limit !== -1) queries.push(Query.limit(limit));
			if (orderType !== null)
				queries.push(orderType === 'ASC' ? Query.orderAsc('') : Query.orderDesc(''));

			return databases.listDocuments<TData>(this.databaseId, this.collectionId, queries);
		}
	};
};
