import {
  integer, pgTable, primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import players from './players.js';
import collections from './collections.js';

export const playersToCollections = pgTable(
  'players_to_collections',
  {
    playerId: integer('player_id').notNull().references(() => players.id, { onDelete: 'cascade' }),
    collectionId: integer('collection_id')
      .notNull()
      .references(() => collections.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    ok: primaryKey({ columns: [table.playerId, table.collectionId] }),
  }),
);

export const playersToCollectionsRelations = relations(
  playersToCollections,
  ({ one }) => ({
    collections: one(collections, {
      fields: [playersToCollections.collectionId],
      references: [collections.id],
    }),
    player: one(players, {
      fields: [playersToCollections.playerId],
      references: [players.id],
    }),
  }),
);

export const playersRelations = relations(players, ({ many }) => ({
  playersToCollections: many(playersToCollections),
}));

export const collectionsRelations = relations(collections, ({ many }) => ({
  playersToCollections: many(playersToCollections),
}));
