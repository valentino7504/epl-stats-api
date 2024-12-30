import { eq, sql } from 'drizzle-orm';
import db from '../utils/dbManager.js';
import players from '../models/players.js';

export function getPlayerById(id) {
  return db.select().from(players).where(eq(id, players.id));
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
/* eslint-enable prefer-template */
