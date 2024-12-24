import 'dotenv/config';

export const { EMAIL_USER } = process.env;

export const { EMAIL_PWD } = process.env;

export const DB_URL = process.env.DATABASE_URL;

export const { SIGNUP_EMAIL_USER } = process.env;

export const { SIGNUP_EMAIL_PWD } = process.env;

export const ENV = process.env.NODE_ENV;

export const PORT = parseInt(process.env.PORT, 10) || 3000;
