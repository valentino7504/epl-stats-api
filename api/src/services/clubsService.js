import { eq, sql } from 'drizzle-orm';
import db from '../utils/dbManager.js';
import clubs from '../models/clubs.js';

export function getClubById(id) {
  return db.select().from(clubs).where(eq(id, clubs.id));
}

export function getAllClubs() {
  return db.select().from(clubs);
}

/* eslint-disable prefer-template */
export async function getClubByName(searchName) {
  const result = await db.execute(
    sql`SELECT * FROM ${clubs} WHERE unaccent(${clubs.name})
    ILIKE unaccent(${'%' + searchName + '%'})`,
  );
  return result.rows;
}
/* eslint-enable prefer-template */
