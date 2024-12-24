import {
  pgTable, unique, varchar, integer, doublePrecision, serial, timestamp,
} from 'drizzle-orm/pg-core';

const clubs = pgTable('clubs', {
  name: varchar().notNull(),
  founded: integer().notNull(),
  city: varchar(),
  position: integer().notNull(),
  matchesPlayed: integer('matches_played').notNull(),
  wins: integer().notNull(),
  draws: integer().notNull(),
  losses: integer().notNull(),
  goalDifference: integer('goal_difference').notNull(),
  goalsScored: integer('goals_scored').notNull(),
  goalsConceded: integer('goals_conceded').notNull(),
  points: integer().notNull(),
  ppg: doublePrecision().notNull(),
  xG: doublePrecision().notNull(),
  xGA: doublePrecision().notNull(),
  xGD: doublePrecision().notNull(),
  xGDp90: doublePrecision().notNull(),
  xGp90: doublePrecision().notNull(),
  lastFive: varchar('last_five'),
  attendancePerGame: integer('attendance_per_game').notNull(),
  possession: doublePrecision(),
  prgC: integer(),
  prgP: integer(),
  noPlayers: integer('no_players').notNull(),
  averageAge: doublePrecision('average_age').notNull(),
  stadium: varchar(),
  nickname: varchar(),
  stadiumCapacity: integer('stadium_capacity'),
  manager: varchar(),
  id: serial().primaryKey().notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull(),
}, (table) => [
  unique('clubs_name_key').on(table.name),
]);

export default clubs;
