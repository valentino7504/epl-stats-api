import {
  integer, pgTable, primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import clubs from './clubs.js';
import collections from './collections.js';

export const clubsToCollections = pgTable(
  'clubs_to_collections',
  {
    clubId: integer('club_id').notNull().references(() => clubs.id),
    collectionId: integer('collection_id')
      .notNull()
      .references(() => collections.id),
  },
  (table) => ({
    ok: primaryKey({ columns: [table.clubId, table.collectionId] }),
  }),
);

export const clubsToCollectionsRelations = relations(
  clubsToCollections,
  ({ one }) => ({
    collections: one(collections, {
      fields: [clubsToCollections.collectionId],
      references: [collections.id],
    }),
    club: one(clubs, {
      fields: [clubsToCollections.clubId],
      references: [clubs.id],
    }),
  }),
);

export const clubsRelations = relations(clubs, ({ many }) => ({
  clubsToCollections: many(clubsToCollections),
}));

export const collectionsRelations = relations(collections, ({ many }) => ({
  clubsToCollections: many(clubsToCollections),
}));
