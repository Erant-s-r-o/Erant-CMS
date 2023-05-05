import collections from '../collections';
import { Query } from 'appwrite';

export const loadExperience = async (pathName: string) => {
	const experience = await collections.experiences.getDocument([Query.equal('ExpURL', pathName)]);
	const rating = await getRating(experience.$id);

	const checkPoints = (
		await collections.checkPoint.listDocuments([Query.equal('$id', experience.ExpCPsID)])
	).documents;

	//experience['rating'] = rating;
	//experience['checkPoints'] = checkPoints;

	return {
		...experience,
		rating,
		checkPoints
	};
};

//Fetch of Rating
const getRating = async (expId: string) => {
	const { documents, total } = await collections.experienceRating.listDocuments([
		Query.equal('ExpID', expId)
	]);
	const sum = documents.reduce((accumulator, rating) => accumulator + rating.ExpUserRating, 0);
	return sum / total || 0;
};

//user progress in experience
export const getUserProgress = async (experienceId: string, userId: string) => {
	const { documents } = await collections.usersAnswers.listDocuments([
		Query.equal('userId', userId),
		Query.equal('experience', experienceId)
	]);
	return documents;
};
