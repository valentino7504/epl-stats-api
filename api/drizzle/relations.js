import { relations } from "drizzle-orm/relations";
import { users, collections, tokens, clubs, players, clubsToCollections, playersToCollections } from "./schema";

export const collectionsRelations = relations(collections, ({one, many}) => ({
	user: one(users, {
		fields: [collections.userId],
		references: [users.id]
	}),
	clubsToCollections: many(clubsToCollections),
	playersToCollections: many(playersToCollections),
}));

export const usersRelations = relations(users, ({many}) => ({
	collections: many(collections),
	tokens: many(tokens),
}));

export const tokensRelations = relations(tokens, ({one}) => ({
	user: one(users, {
		fields: [tokens.userId],
		references: [users.id]
	}),
}));

export const playersRelations = relations(players, ({one, many}) => ({
	club: one(clubs, {
		fields: [players.clubId],
		references: [clubs.id]
	}),
	playersToCollections: many(playersToCollections),
}));

export const clubsRelations = relations(clubs, ({many}) => ({
	players: many(players),
	clubsToCollections: many(clubsToCollections),
}));

export const clubsToCollectionsRelations = relations(clubsToCollections, ({one}) => ({
	club: one(clubs, {
		fields: [clubsToCollections.clubId],
		references: [clubs.id]
	}),
	collection: one(collections, {
		fields: [clubsToCollections.collectionId],
		references: [collections.id]
	}),
}));

export const playersToCollectionsRelations = relations(playersToCollections, ({one}) => ({
	player: one(players, {
		fields: [playersToCollections.playerId],
		references: [players.id]
	}),
	collection: one(collections, {
		fields: [playersToCollections.collectionId],
		references: [collections.id]
	}),
}));