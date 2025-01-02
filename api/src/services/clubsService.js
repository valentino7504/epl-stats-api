import { eq, sql } from 'drizzle-orm';
import db from '../utils/dbManager.js';
import clubs from '../models/clubs.js';
import players from '../models/players.js';
import { SITE_URL } from '../utils/config.js';

export async function getClubById(id) {
  const results = await db.select({ club: clubs, playerId: players.id })
    .from(clubs)
    .leftJoin(players, eq(clubs.id, players.clubId))
    .where(eq(id, clubs.id));
  if (results.length < 1) {
    throw new Error('Club ID does not exist');
  }
  const { club } = results[0];
  const playerUrls = results.map((row) => `${SITE_URL}/api/players/${row.playerId}`);
  return { ...club, players: playerUrls };
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
