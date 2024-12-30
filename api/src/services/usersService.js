import { and, eq } from 'drizzle-orm';
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
  const { email, password } = req.body;
  validateEmailAndPassword(email, password);
  const hashCheck = await hashSecret(password);
  const removed = await db.delete(users)
    .where(and(eq(users.email, email), users.hashedPassword === hashCheck))
    .returning();
  if (removed.length < 1) {
    const userExists = await db.select()
      .from(users)
      .where(eq(users.email, email));
    if (userExists.length < 1) {
      throw new Error('No user found with the provided email');
    }
    throw new Error('The password is incorrect');
  }
}

export async function updateUser(req) {
  const {
    email, password, newEmail, newPassword,
  } = req.body;
  validateEmailAndPassword(email, password);
  const newObj = {};
  if (!newEmail && !newPassword) {
    throw new Error('No parameters supplied');
  }
  if (newEmail) {
    newObj.email = newEmail;
  }
  if (newPassword) {
    newObj.hashedPassword = hashSecret(password);
  }
  newObj.updated = new Date();
  const hashCheck = hashSecret(password);
  const result = await db.update(users)
    .set(newObj)
    .where(and(eq(email, users.email), users.hashedPassword === hashCheck))
    .returning({ id: users.id, email: users.email });
  if (result.length < 1) {
    throw new Error('Email/password incorrect');
  }
  return result[0];
}
