import { relations } from 'drizzle-orm/relations';
import { clubs, players } from './schema';

export const playersRelations = relations(players, ({ one }) => ({
  club: one(clubs, {
    fields: [players.clubId],
    references: [clubs.id],
  }),
}));

export const clubsRelations = relations(clubs, ({ many }) => ({
  players: many(players),
}));

