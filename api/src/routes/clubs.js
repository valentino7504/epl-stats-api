import { Router } from 'express';
import {
  getClubById, getAllClubs, getClubByName,
} from '../services/clubsService.js';

const clubsRouter = Router();

clubsRouter.get('/', async (req, res, next) => {
  const playerName = req.query.name;
  try {
    let result;
    if (playerName) {
      result = await getClubByName(playerName);
    } else {
      result = await getAllClubs();
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

clubsRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getClubById(id);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ error: 'Not Found', message: 'Club does not exist' });
    }
  } catch (err) {
    next(err);
  }
});

export default clubsRouter;
