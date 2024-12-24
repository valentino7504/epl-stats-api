import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, sql } from 'drizzle-orm';
import { DB_URL } from './config.js';
import players from '../models/players.js';
import clubs from '../models/clubs.js';

export const db = drizzle(DB_URL);

export function getPlayerById(id) {
  return db.select().from(players).where(eq(id, players.id));
}

export function getClubById(id) {
  return db.select().from(clubs).where(eq(id, clubs.id));
}

export function getAllClubs() {
  return db.select().from(clubs);
}

export function getAllPlayers() {
  return db.select().from(players);
}

/* eslint-disable prefer-template */
export async function getPlayersByName(searchName) {
  const result = await db.execute(
    sql`SELECT * FROM ${players} WHERE unaccent(${players.name})
    ILIKE unaccent(${'%' + searchName + '%'})`,
  );
  return result.rows;
}

export async function getClubByName(searchName) {
  const result = await db.execute(
    sql`SELECT * FROM ${clubs} WHERE unaccent(${clubs.name})
    ILIKE unaccent(${'%' + searchName + '%'})`,
  );
  return result.rows;
}
/* eslint-enable prefer-template */
