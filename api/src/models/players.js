import {
  pgTable, unique, varchar,
  integer, doublePrecision,
  serial, timestamp, foreignKey, boolean,
} from 'drizzle-orm/pg-core';
import clubs from './clubs.js';

const players = pgTable('players', {
  name: varchar().notNull(),
  clubId: integer('club_id').notNull(),
  nationality: varchar().notNull(),
  position: varchar().notNull(),
  birthDate: timestamp('birth_date', { mode: 'string' }).notNull(),
  matchesPlayed: integer('matches_played').notNull(),
  yellowCards: integer('yellow_cards').notNull(),
  redCards: integer('red_cards').notNull(),
  starts: integer().notNull(),
  full90s: integer('full_90s').notNull(),
  minutes: integer().notNull(),
  goals: integer().notNull(),
  assists: integer().notNull(),
  nonPenaltyGoals: integer('non_penalty_goals').notNull(),
  xG: doublePrecision().notNull(),
  npxG: doublePrecision().notNull(),
  xAG: doublePrecision().notNull(),
  prgC: integer().notNull(),
  prgP: integer().notNull(),
  goalsP90: doublePrecision('goals_p90').notNull(),
  assistsP90: doublePrecision('assists_p90').notNull(),
  xGp90: doublePrecision('xG_p90').notNull(),
  xAGp90: doublePrecision('xAG_p90').notNull(),
  tackles: integer(),
  saves: integer(),
  cleanSheets: integer('clean_sheets'),
  interceptions: integer(),
  blocks: integer(),
  savePercent: doublePrecision('save_percent'),
  clearances: integer(),
  isCaptain: boolean('is_captain'),
  id: serial().primaryKey().notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull(),
}, (table) => [
  foreignKey({
    columns: [table.clubId],
    foreignColumns: [clubs.id],
    name: 'players_club_id_fkey',
  }),
  unique('players_name_club_id_key').on(table.name, table.clubId),
]);

export default players;
