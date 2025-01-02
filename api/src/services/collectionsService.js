import {
  and, eq, inArray, sql,
} from 'drizzle-orm';
import collections from '../models/collections.js';
import db from '../utils/dbManager.js';
import players from '../models/players.js';
import { playersToCollections } from '../models/collectionsPlayers.js';
import clubs from '../models/clubs.js';
import { clubsToCollections } from '../models/collectionsClubs.js';

async function getPlayersAndClubs(collection) {
  const collectionPlayers = await db
    .select(players)
    .from(playersToCollections)
    .innerJoin(players, eq(playersToCollections.playerId, players.id))
    .where(eq(playersToCollections.collectionId, collection.id));
  const collectionClubs = await db
    .select(clubs)
    .from(clubsToCollections)
    .innerJoin(clubs, eq(clubsToCollections.clubId, clubs.id))
    .where(eq(clubsToCollections.collectionId, collection.id));
  return { ...collection, players: collectionPlayers, clubs: collectionClubs };
}

export async function createCollection(userId, info) {
  const { name, description } = info;
  try {
    const collection = await db
      .insert(collections)
      .values({ userId, name, description })
      .returning({
        id: collections.id,
        userId: collections.userId,
        name: collections.name,
        description: collections.description,
      });
    return collection[0];
  } catch (err) {
    if (parseInt(err.code, 10) === 23505 || err.message.toLowerCase().includes('unique')) {
      throw new Error('Collection with this name already exists for this user');
    }
    throw new Error(err.message);
  }
}

export async function updateCollectionMetadata(collectionId, userId, updatedDetails) {
  const { name, description } = updatedDetails;
  const updatedObj = { updatedAt: new Date() };
  if (name) {
    updatedObj.name = name;
  }
  if (description) {
    updatedObj.description = description;
  }
  const collectionArr = await db
    .update(collections)
    .set(updatedObj)
    .where(and(eq(collections.id, collectionId), eq(collections.userId, userId)))
    .returning({
      id: collections.id,
      userId: collections.userId,
      name: collections.name,
      description: collections.description,
    });
  if (collectionArr.length < 1) {
    throw new Error('No collection with this id belonging to this user');
  }
  return getPlayersAndClubs(collectionArr[0]);
}

export async function deleteCollection(collectionId, userId) {
  const collectionArr = await db
    .delete(collections)
    .where(and(eq(collections.id, collectionId), eq(collections.userId, userId)))
    .returning({ id: collections.id });
  if (collectionArr.length < 1) {
    throw new Error('Collection does not exist for the authenticated user');
  }
}

export async function getCollectionById(userId, collectionId) {
  const collectionArr = await db
    .select()
    .from(collections)
    .where(and(eq(collections.id, collectionId), eq(collections.userId, userId)));
  if (collectionArr.length < 1) {
    throw new Error('Collection does not exist for the authenticated user');
  }
  const collection = await getPlayersAndClubs(collectionArr[0]);
  return collection;
}

export async function getAllUserCollections(userId) {
  const collectionArr = await db.select().from(collections).where(eq(collections.userId, userId));
  const collectionsData = Promise.all(collectionArr.map(getPlayersAndClubs));
  return collectionsData;
}

/* eslint-disable prefer-template */
export async function getCollectionsByName(name, userId) {
  const collectionArr = await db.execute(
    sql`SELECT * FROM ${collections} WHERE unaccent(${collections.name})
    ILIKE unaccent(${'%' + name + '%'}) AND ${collections.userId} = ${'' + userId}`,
  );
  if (collectionArr.rows.length < 1) {
    return [];
  }
  const collectionsData = Promise.all(collectionArr.rows.map(getPlayersAndClubs));
  return collectionsData;
}
/* eslint-enable prefer-template */

export async function addPlayersToCollection(collectionId, userId, playerIds) {
  if (!Array.isArray(playerIds)) {
    throw new Error('Items to add/remove must be in an array');
  }
  const playersArray = playerIds.map((playerId) => ({ collectionId, playerId }));
  const collection = await db
    .select()
    .from(collections)
    .where(and(eq(collections.id, collectionId), eq(collections.userId, userId)));
  if (collection.length === 0) {
    throw new Error('Collection does not belong to the authorized user');
  }
  try {
    await db.insert(playersToCollections).values(playersArray);
  } catch (err) {
    if (parseInt(err.code, 10) === 23503) {
      throw new Error('Invalid player ID');
    }
  }
  return getCollectionById(userId, collectionId);
}

export async function addClubsToCollection(collectionId, userId, clubIds) {
  if (!Array.isArray(clubIds)) {
    throw new Error('Items to add/remove must be in an array');
  }
  const clubsArray = clubIds.map((clubId) => ({ collectionId, clubId }));
  await db.transaction(async (tx) => {
    const collection = await tx
      .select()
      .from(collections)
      .where(and(eq(collections.id, collectionId), eq(collections.userId, userId)));
    if (collection.length === 0) {
      throw new Error('Collection does not belong to the authorized user');
    }
    try {
      await tx.insert(clubsToCollections).values(clubsArray);
    } catch (err) {
      if (parseInt(err.code, 10) === 23503) {
        throw new Error('Invalid club ID');
      }
    }
  });
  return getCollectionById(userId, collectionId);
}

export async function removePlayersFromCollection(collectionId, userId, playerIds) {
  if (!Array.isArray(playerIds)) {
    throw new Error('Items to add/remove must be in an array');
  }
  await db.transaction(async (tx) => {
    const collection = await tx
      .select()
      .from(collections)
      .where(and(eq(collections.id, collectionId), eq(collections.userId, userId)));
    if (collection.length === 0) {
      throw new Error('Collection does not belong to the authorized user');
    }
    try {
      await tx.delete(playersToCollections)
        .where(inArray(playersToCollections.playerId, playerIds));
    } catch (err) {
      if (parseInt(err.code, 10) === 23503) {
        throw new Error('Invalid player ID in array');
      }
    }
  });
}

export async function removeClubsFromCollection(collectionId, userId, clubIds) {
  if (!Array.isArray(clubIds)) {
    throw new Error('Items to add/remove must be in an array');
  }
  await db.transaction(async (tx) => {
    const collection = await tx
      .select()
      .from(collections)
      .where(and(eq(collections.id, collectionId), eq(collections.userId, userId)));
    if (collection.length === 0) {
      throw new Error('Collection does not belong to the authorized user');
    }
    try {
      await tx.delete(clubsToCollections).where(inArray(clubsToCollections.clubId, clubIds));
    } catch (err) {
      if (parseInt(err.code, 10) === 23503) {
        throw new Error('Invalid club ID');
      }
    }
  });
}
