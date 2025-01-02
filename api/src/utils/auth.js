import { v4 as uuidv4 } from 'uuid';
import { eq, sql } from 'drizzle-orm';
import { hashSecret, verifySecret } from './secretHashing.js';
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
  const token = authHeaderSplit[1];
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
  const allTokens = await db.select().from(tokens);
  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < allTokens.length; i += 1) {
    const tokenRecord = allTokens[i];
    const verified = await verifySecret(tokenRecord.hashedToken, token);
    if (verified) {
      const { userId } = tokenRecord;
      const userArr = await db.select().from(users).where(eq(users.id, userId));
      if (userArr.length < 1) {
        throw new Error('Provided token is not linked to any user');
      }
      const user = userArr[0];
      return { email: user.email, id: user.id };
    }
  }
  /* eslint-enable no-await-in-loop */
  throw new Error('Provided token is not linked to any user');
};
