import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET, API_KEY_SECRET } from '$env/static/private';
import collections from '../collections';
import appwriteNode, { account, users } from '../appwriteNode/appwriteNode';

const getUserByJWT = async (jwt: string) => {
	const decoded: jsonwebtoken.JwtPayload = jsonwebtoken.verify(jwt, JWT_SECRET, {
		ignoreExpiration: true
	});
	console.log(decoded);

	const { userId } = decoded;
	return await getUserByUserId(userId);
};

/*
jwt payload
  {
  userId: string,
  sessionId: string,
  exp: number
}
*/

const getUserByUserId = async (userId: string) => {
	appwriteNode.setKey(API_KEY_SECRET);
	return await users.get(userId);
};

const createJWTByUserId = async (userId: string) => {
	const jwt = jsonwebtoken.sign({
		userId: userId,
		sessionId: string,
		exp: number
	});
	const { userId } = decoded;
	return await getUserByUserId(userId);
};

export default { getByJWT: getUserByJWT };
