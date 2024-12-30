import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';
import { hashSecret } from './secretHashing.js';
import db from './dbManager.js';
import tokens from '../models/tokens.js';

import { EMAIL_REGEX } from './config.js';
import users from '../models/users.js';

export function generateToken() {
  return uuidv4();
}

export async function storeToken(userId, token) {
  if (!userId) {
    throw new Error('No user ID provided');
  }
  const hashedToken = await hashSecret(token);
  const tokenObj = { userId, hashedToken };
  try {
    await db.insert(tokens).values(tokenObj);
    return { token };
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function extractToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Token not provided');
  }
  const authHeaderSplit = authHeader.split(' ');
  if (authHeaderSplit[0] !== 'Bearer' || authHeaderSplit.length < 2) {
    throw new Error('Token malformatted');
  }
  const token = authHeaderSplit[0];
  return token;
}

export const validateEmailAndPassword = (email, password) => {
  if (!email) {
    throw new Error('The "email" field is required');
  }
  if (!EMAIL_REGEX.test(email)) {
    throw new Error('Enter a valid email');
  }
  if (!password) {
    throw new Error('The "password" field is required');
  }
};

export const getUserFromToken = async (token) => {
  const hashCheck = await hashSecret(token);
  const userArr = await db.select()
    .from(users)
    .innerJoin(tokens, eq(tokens.userId, users.id))
    .where(tokens.hashedToken === hashCheck);
  if (userArr.length < 1) {
    throw new Error('Provided token does not exist');
  }
  const userObj = userArr[0].users;
  return { email: userObj.email, id: userObj.id };
};
