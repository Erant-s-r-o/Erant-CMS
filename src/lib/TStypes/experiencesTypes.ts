import { Models } from 'appwrite';

export interface CheckPoint extends Partial<Models.Document> {
	$updatedAt: string;
	CPAfter: string;
	CPAnswerID: string;
	CPHint: string;
	CPImage?: string;
	CPLocation: number[];
	CPMoveHelp?: string;
	CPName: string;
	CPOptions: string[]; //it will be always [] empty
	CPText: string;
	CPType: 'CHECKBOX' | 'TEXT' | 'INFO' | 'RADIO' | 'NUMBER';
}

export interface Experience extends Partial<Models.Document> {
	ExpApproved: boolean;
	ExpCPsID: string[];
	ExpCategory?: string;
	ExpEnd0: string;
	ExpEnd60: string;
	ExpEnd100: string;
	ExpImage?: string;
	ExpIntroduction: string;
	ExpLocation: number[];
	ExpName: string;
	ExpStart: string;
	ExpTestingCode: string;
	ExpURL: string;
	UserID: string;
	checkPoints: Array<CheckPoint>;
	rating: number;
}

export interface ExpRating extends Partial<Models.Document> {
	UserId: string;
	ExpId: string;
	ExpUserRating: number;
}
export interface UserInfo extends Partial<Models.Document> {
	userId: string;
	userName: string;
	erantId: string;
	userImage: string;
	userInterests: string;
	userTravelBuddy: string;
	userRecommended: string;
	termsAccepted: boolean;
}

export interface CheckPointDocument extends Models.Document {
	$updatedAt: string;
	CPAfter: string;
	CPAnswerID: string;
	CPHint: string;
	CPImage?: string;
	CPLocation: number[];
	CPMoveHelp?: string;
	CPName: string;
	CPOptions?: string[];
	CPText: string;
	CPType: 'CHECKBOX' | 'TEXT' | 'INFO' | 'RADIO' | 'NUMBER';
}

export interface ExperienceDocument extends Models.Document {
	ExpApproved: boolean;
	ExpCPsID: string[];
	ExpCategory?: string;
	ExpEnd0: string;
	ExpEnd60: string;
	ExpEnd100: string;
	ExpImage?: string;
	ExpIntroduction: string;
	ExpLocation: number[];
	ExpName: string;
	ExpStart: string;
	ExpTestingCode: string;
	ExpURL: string;
	UserID: string;
	checkPoints: Array<string>;
}

export interface CPAnswerDocument extends Models.Document {
	CPAnswer: string[];
}

export interface UsersAnswersDocument extends Models.Document {
	userId: string;
	checkPoint: string;
	experience: string;
	correct: boolean;
	attemptCount: number;
}
export interface ExpRatingDocument extends Models.Document {
	UserId: string;
	ExpId: string;
	ExpUserRating: number;
}
export interface UserInfoDocument extends Models.Document {
	userId: string;
	userName: string;
	erantId: string;
	userImage: string;
	userInterests: string;
	userTravelBuddy: string;
	userRecommended: string;
	termsAccepted: boolean;
}
