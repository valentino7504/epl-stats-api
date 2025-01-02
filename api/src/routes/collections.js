import { Router } from 'express';
import { authenticateToken } from '../utils/middleware.js';
import {
  createCollection, deleteCollection, getCollectionById,
  updateCollectionMetadata, getCollectionsByName,
  getAllUserCollections,
  addPlayersToCollection,
  addClubsToCollection,
  removePlayersFromCollection,
  removeClubsFromCollection,
} from '../services/collectionsService.js';

const collectionsRouter = Router();

collectionsRouter.use(authenticateToken);

collectionsRouter.get('/', async (req, res) => {
  const userId = req.user.id;
  const { name } = req.query;
  let collections;
  if (name) {
    collections = await getCollectionsByName(name, userId);
  } else {
    collections = await getAllUserCollections(userId);
  }
  return res.status(200).json(collections);
});

collectionsRouter.post('/', async (req, res) => {
  const userId = req.user.id;
  const { name, description } = req.body;
  try {
    const collection = await createCollection(userId, { name, description });
    return res.status(200).json(collection);
  } catch (err) {
    return res.status(400).json({ error: 'Bad request', message: err.message });
  }
});

collectionsRouter.get('/:id', async (req, res) => {
  const userId = req.user.id;
  const collectionId = req.params.id;
  try {
    const collection = await getCollectionById(userId, collectionId);
    return res.status(200).json(collection);
  } catch (err) {
    return res.status(404).json({ error: 'Not Found', message: err.message });
  }
});

collectionsRouter.delete('/:id', async (req, res) => {
  const userId = req.user.id;
  const collectionId = req.params.id;
  try {
    await deleteCollection(collectionId, userId);
    return res.status(204).end();
  } catch (err) {
    return res.status(404).json({ error: 'Not Found', message: err.message });
  }
});

collectionsRouter.post('/:id', async (req, res) => {
  const userId = req.user.id;
  const collectionId = req.params.id;
  try {
    const updatedCollection = await updateCollectionMetadata(collectionId, userId, req.body);
    return res.status(201).json(updatedCollection);
  } catch (err) {
    return res.status(400).json({ err: 'Bad request', message: err.message });
  }
});

collectionsRouter.post('/:id/players', async (req, res) => {
  const userId = req.user.id;
  const collectionId = req.params.id;
  const { players } = req.body;
  try {
    const collection = await addPlayersToCollection(collectionId, userId, players);
    return res.status(200).json(collection);
  } catch (err) {
    return res.status(400).json({ error: 'Bad request', message: err.message });
  }
});

collectionsRouter.post('/:id/clubs', async (req, res) => {
  const userId = req.user.id;
  const collectionId = req.params.id;
  const { clubs } = req.body;
  try {
    const collection = await addClubsToCollection(collectionId, userId, clubs);
    return res.status(201).json(collection);
  } catch (err) {
    return res.status(400).json({ error: 'Bad request', message: err.message });
  }
});

collectionsRouter.delete('/:id/players', async (req, res) => {
  const userId = req.user.id;
  const collectionId = req.params.id;
  const { players } = req.body;
  try {
    await removePlayersFromCollection(collectionId, userId, players);
    return res.status(204).end();
  } catch (err) {
    return res.status(400).json({ error: 'Bad request', message: err.message });
  }
});

collectionsRouter.delete('/:id/clubs', async (req, res) => {
  const userId = req.user.id;
  const collectionId = req.params.id;
  const { clubs } = req.body;
  try {
    await removeClubsFromCollection(collectionId, userId, clubs);
    return res.status(204).end();
  } catch (err) {
    return res.status(400).json({ error: 'Bad request', message: err.message });
  }
});

export default collectionsRouter;
