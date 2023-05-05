import { databases, user as userStore } from '$lib/appwrite';
import { Models, Permission, Query, Role } from 'appwrite';
import { getLocationDataFromLatAndLong } from '../locations';
import { Writable, writable } from 'svelte/store';
import { CheckPoint, Experience } from '$lib/TStypes/experiencesTypes';
import collections from '$lib/collections';

export type AnswerState = 'wrong-firstTime' | 'wrong-secondTime' | 'correct' | 'not-control' | null;

let user: { $id: string };
userStore?.subscribe((res) => (user = res));

//Loading of checkpoints and rating is done in the same function to prevent multiple requests to the database
export const load = async (pathName: string) => {
	let checkPoints: Array<CheckPoint> = [];

	const experience = (
		await databases.listDocuments<Experience & Models.Document>(
			'63cef30d6da945dd4250',
			'63cef4bd210fdf2e5888',
			[Query.equal('ExpURL', pathName)]
		)
	).documents[0];

	const rating = await getRating(experience.$id);

	checkPoints = (
		await databases.listDocuments<Models.Document & CheckPoint>(
			'63cef30d6da945dd4250',
			'63cef84d908acf805758',
			[Query.equal('$id', experience.ExpCPsID)]
		)
	).documents;

	experience['rating'] = rating;
	experience['checkPoints'] = checkPoints;

	return experience;
};

export const loadAsStore = (pathName: string) => {
	const store = writable<Experience>();
	load(pathName).then((experience) => {
		store.set(experience);
	});
	return [store];
};

//Fetch of Rating
const getRating = async (expId: string) => {
	const { documents, total } = await databases.listDocuments(
		'63cef30d6da945dd4250',
		'63ee6353ebb174cf815d',
		[Query.equal('ExpID', expId)]
	);
	const sum = documents.reduce((accumulator, rating) => accumulator + rating.ExpUserRating, 0);
	return sum / total || 0;
};

// Fetch of answers to the checkpoints
export const answer = async (
	experienceId: string,
	checkPointId: string,
	answer: number | string | string[]
) => {
	const checkPoint = await databases.getDocument(
		'63cef30d6da945dd4250',
		'63cef84d908acf805758',
		checkPointId
	);
	const { CPType, CPAnswerID } = checkPoint;
	const correctAnswer =
		CPType !== 'INFO'
			? (
					await databases.getDocument(
						'63cef30d6da945dd4250',
						'63dd5c2b764061e40025',
						CPAnswerID
					)
			  ).CPAnswer
			: true;

	let correct = false;

	if (CPType === 'CHECKBOX') correct = JSON.stringify(answer) === JSON.stringify(correctAnswer);
	if (CPType === 'RADIO' || CPType === 'NUMBER' || CPType === 'TEXT')
		correct = answer === correctAnswer[0];
	if (CPType === 'INFO') correct = false;
	await saveAnswerIntoDatabase(experienceId, checkPointId, correct);

	return correct;
};

const saveAnswerIntoDatabase = async (
	experienceId: string,
	checkPointId: string,
	correct: boolean
) => {
	const previousAttemptDocument = await getUserAnswer(user.$id, checkPointId);

	if (!(previousAttemptDocument?.attemptCount === 2)) {
		if (previousAttemptDocument) {
			collections.usersAnswers.updateDocument(previousAttemptDocument.$id, {
				correct,
				attemptCount: 2
			});
		} else {
			await collections.usersAnswers.createDocument(
				{
					userId: user.$id,
					checkPoint: checkPointId,
					correct,
					experience: experienceId,
					attemptCount: 1
				},
				[Permission.read(Role.user(user.$id)), Permission.update(Role.user(user.$id))]
			);
		}
	} else {
		const err = new Error('User has already answered.');
		throw err;
	}
};

export const getUserAnswer = async (userId: string, checkPointId: string) => {
	return (
		await databases.listDocuments('63cef30d6da945dd4250', 'users-answers', [
			Query.equal('checkPoint', checkPointId),
			Query.equal('userId', userId)
		])
	).documents[0];
};

// Fetch of all experiences
export const getExperiences = async () => {
	const experiences = (
		await databases.listDocuments('63cef30d6da945dd4250', '63cef4bd210fdf2e5888', [
			Query.equal('ExpApproved', true)
		])
	).documents;
	const items = [];
	for (const experience of experiences) {
		items.push({
			city: (
				await getLocationDataFromLatAndLong(
					experience.ExpLocation[0],
					experience.ExpLocation[1]
				)
			).city,
			...experience
		});
	}

	return items;
};
// Fetch of all experiences as store
export const getExperiencesAsStore = () => {
	const store = writable<(Experience & { city: string })[]>([]);
	const loading = writable<boolean>(true);
	databases
		.listDocuments<Models.Document & Experience>(
			'63cef30d6da945dd4250',
			'63cef4bd210fdf2e5888',
			[Query.equal('ExpApproved', true)]
		)
		.then(async ({ documents }) => {
			const items: (Experience & { city: string })[] = [];
			for (const experience of documents) {
				items.push({
					city: (
						await getLocationDataFromLatAndLong(
							experience.ExpLocation[0],
							experience.ExpLocation[1]
						)
					).city,
					...experience
				});
			}
			loading.set(false);
			store.set(items);
		});

	return [store, loading] as const;
};

export const getUserProgress = async (experienceId: string) => {
	const { documents } = await databases.listDocuments('63cef30d6da945dd4250', 'users-answers', [
		Query.equal('userId', user.$id),
		Query.equal('experience', experienceId)
	]);
	return documents;
};
export const getUserProgressAsStore = (experienceId: string) => {
	const store = writable<Models.Document[]>([]);
	const loading = writable<boolean>(true);
	getUserProgress(experienceId).then((documents) => {
		store.set(documents);
		loading.set(false);
	});
	return [store, loading] as const;
};

export const getExperienceIdByUrl = async (url: string) => {
	return (
		await databases.listDocuments('63cef30d6da945dd4250', '63cef4bd210fdf2e5888', [
			Query.equal('ExpURL', url)
		])
	).documents[0].$id;
};
export const getExperienceIdByUrlAsStore = (url: string): [Writable<string>] => {
	const store = writable<string>();
	getExperienceIdByUrl(url).then((exp) => store.set(exp));
	return [store];
};
// !pridat trideni podle kategorie! export const getExperiencesByCategory = async (category: string) => {}
