import {
	CheckPointDocument,
	ExpRatingDocument,
	ExperienceDocument,
	UsersAnswersDocument
} from '$lib/TStypes/experiencesTypes';
import { Collection } from './appwriteNode/appwriteNode';

const experiences = new Collection<ExperienceDocument>(
	'63cef30d6da945dd4250',
	'63cef4bd210fdf2e5888'
);
const users = new Collection('63ded6c18e8493bffc83', 'Users');
const interests = new Collection('6417cf1de159d094b370', '6417cf29f2118829b3b4');
const travelWith = new Collection('6417cf1de159d094b370', '6417d0429843609a2f49');
const recommendedBy = new Collection('6417cf1de159d094b370', '6417d00e40701375978b');
const usersAnswers = new Collection<UsersAnswersDocument>('63cef30d6da945dd4250', 'users-answers');
const checkPoint = new Collection<CheckPointDocument>(
	'63cef30d6da945dd4250',
	'63cef84d908acf805758'
);
const experienceRating = new Collection<ExpRatingDocument>(
	'63cef30d6da945dd4250',
	'63ee6353ebb174cf815d'
);

export default {
	experiences,
	users,
	interests,
	travelWith,
	recommendedBy,
	usersAnswers,
	checkPoint,
	experienceRating
};
