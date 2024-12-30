import { eq } from 'drizzle-orm';
import { generateToken, storeToken } from '../utils/auth.js';
import { sendMail } from './emailService.js';
import { hashSecret } from '../utils/secretHashing.js';
import db from '../utils/dbManager.js';
import tokens from '../models/tokens.js';

export async function assignUserToken(user, sendEmail) {
  const { email, id } = user;
  const token = generateToken();
  const tokenJson = await storeToken(id, token);
  if (sendEmail) {
    sendMail(email, 'Your API token', `You indicated interest to receive your API token via email: ${token}`);
  }
  return tokenJson;
}

export async function deleteToken(token) {
  const hashCheck = await hashSecret(token);
  const revokedArr = await db.delete(tokens)
    .where(tokens.hashedToken === hashCheck)
    .returning();
  if (revokedArr.length < 1) {
    throw new Error('Token does not exist');
  }
}

export async function deleteUserTokens(user) {
  const { userId } = user;
  const result = await db.delete(tokens)
    .where(eq(tokens.userId, userId))
    .returning({ tokenId: tokens.id });
  if (result.length < 1) {
    throw new Error('No tokens associated with user');
  }
}
