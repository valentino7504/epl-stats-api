import { eq } from 'drizzle-orm';
import users from '../models/users.js';
import db from '../utils/dbManager.js';
import { hashSecret } from '../utils/secretHashing.js';
import { validateEmailAndPassword } from '../utils/auth.js';

export async function createUser(req) {
  const { email, password } = req.body;
  validateEmailAndPassword(email, password);
  const userObj = { email, hashedPassword: await hashSecret(password) };
  try {
    const userArr = await db.insert(users).values(userObj).returning(
      { email: users.email, id: users.id },
    );
    return userArr[0];
  } catch (err) {
    if (parseInt(err.code, 10) === 23505 || err.message.toLowerCase().includes('unique')) {
      throw new Error('A user with this email exists');
    }
    throw new Error(err.message);
  }
}

export async function getUserByEmail(email) {
  const userArr = await db.select().from(users).where(eq(users.email, email));
  if (userArr.length < 1) {
    throw new Error('No user with email provided exists');
  }
  return userArr[0];
}

export async function deleteUser(req) {
  const userId = req.user.id;
  const removed = await db.delete(users)
    .where(eq(users.id, userId))
    .returning();
  if (removed.length < 1) {
    if (removed.length < 1) {
      throw new Error('No user found with the provided email');
    }
    throw new Error('The password is incorrect');
  }
}

export async function updateUser(req) {
  const {
    newEmail, newPassword,
  } = req.body;
  const userId = req.user.id;
  const newObj = {};
  if (!newEmail && !newPassword) {
    throw new Error('No parameters supplied');
  }
  if (newEmail) {
    newObj.email = newEmail;
  }
  if (newPassword) {
    newObj.hashedPassword = await hashSecret(newPassword);
  }
  newObj.updated = new Date();
  const result = await db.update(users)
    .set(newObj)
    .where(eq(userId, users.id))
    .returning({ id: users.id, email: users.email });
  if (result.length < 1) {
    throw new Error('Invalid API token');
  }
  return result[0];
}
