import * as argon2 from 'argon2';

export const hashSecret = async (secret) => argon2.hash(secret);
export const verifySecret = async (hash, secret) => argon2.verify(hash, secret);
