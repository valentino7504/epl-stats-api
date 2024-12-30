import { eq } from 'drizzle-orm';
import db from '../utils/dbManager.js';
import passwordTokens from '../models/passwordResetToken.js';
import users from '../models/users.js';
import { generateToken, validateEmailAndPassword } from '../utils/auth.js';
import { getUserByEmail } from './usersService.js';
import { hashSecret } from '../utils/secretHashing.js';

export async function createPasswordToken(req) {
  const { email, password } = req.body;
  validateEmailAndPassword(email, password);
  const user = await getUserByEmail(email);
  const userId = user.id;
  const newResetToken = {
    token: await generateToken(),
    hashedPassword: await hashSecret(password),
    userId,
  };
  const tokenArr = await db.insert(passwordTokens).values(newResetToken).returning(
    { token: passwordTokens.token },
  );
  const resetToken = tokenArr[0];
  return resetToken;
}

export async function updateUserPassword(token) {
  if (!token) {
    throw new Error('Reset token not provided');
  }
  const tokenArr = await db.select()
    .from(passwordTokens)
    .where(eq(passwordTokens.token, token));
  if (tokenArr.length < 1) {
    throw new Error('No such reset token exists');
  }
  const resetToken = tokenArr[0];
  const now = new Date();
  if (resetToken.expiresAt < now || resetToken.used) {
    throw new Error('Reset token has expired or been used');
  }
  const updatedUserArr = await db.update(users)
    .set({ hashedPassword: resetToken.hashedPassword, updatedAt: new Date() })
    .where(eq(users.id, resetToken.userId))
    .returning({ id: users.id, email: users.email });
  resetToken.used = true;
  return updatedUserArr[0];
}
