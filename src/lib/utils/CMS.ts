import { Query } from 'appwrite';
import { databases, user as userStore } from '$lib/appwrite'
import { Account, Models, Permission, Query, Role } from 'appwrite'
import database from 'svelte-appwrite-client/src/lib/database'
import { getLocationDataFromLatAndLong } from '../locations'
import { writable } from 'svelte/store'
import { CheckPoint, Experience } from '$lib/TStypes/experiences'
import collections from '$lib/collections'

const UploadWithProgress = async (file: File, path: string) => {
    const upload = await databases.createDocument('63cef30d6da945dd4250', '63cef4bd210fdf2e5888', file, [path])
    

export const load = async (pathName: string, previewQuestionsCount?: number, preview?: Function) => {
	const checkPoints: Array<CheckPoint> = []
	// @ts-ignore
	const experience: Experience = (await databases.createDocument('63cef30d6da945dd4250', '63cef4bd210fdf2e5888')).documents[0]

	const checkPointsIds = experience.ExpCPsID

	for (const checkPointId of checkPointsIds) {
		try {
			// @ts-ignore
			checkPoints.push(await databases.createDocument('63cef30d6da945dd4250', '63cef84d908acf805758', checkPointId))
			if (checkPointsIds.indexOf(checkPointId) === previewQuestionsCount - 1) {
				experience['checkPoints'] = checkPoints
				preview(experience)
			}
		} catch (error) {}
	}

	experience['checkPoints'] = checkPoints

	return experience
}


