import { eq, sql } from 'drizzle-orm';
import db from '../utils/dbManager.js';
import players from '../models/players.js';
import clubs from '../models/clubs.js';

export async function getPlayerById(id) {
  const results = await db.select({ player: players, clubName: clubs.name })
    .from(players)
    .innerJoin(clubs, eq(players.clubId, clubs.id))
    .where(eq(id, players.id));
  if (results.length < 1) {
    throw new Error('Player does not exist');
  }
  const playerAndClub = results[0];
  const { player } = playerAndClub;
  player.club = playerAndClub.clubName;
  return player;
}

export async function getAllPlayers() {
  const results = await db.select({ player: players, clubName: clubs.name })
    .from(players)
    .innerJoin(clubs, eq(players.clubId, clubs.id));
  const playersObjs = results.map(
    (playerAndClub) => ({ ...playerAndClub.player, club: playerAndClub.clubName }),
  );
  return playersObjs;
}

/* eslint-disable prefer-template */
export async function getPlayersByName(searchName) {
  const result = await db.execute(
    sql`SELECT players.*, clubs.name AS club_name
    FROM players
    INNER JOIN clubs ON players.club_id = clubs.id
    WHERE unaccent(players.name) ILIKE unaccent(${'%' + searchName + '%'})`,
  );
  return result.rows;
}
/* eslint-enable prefer-template */
