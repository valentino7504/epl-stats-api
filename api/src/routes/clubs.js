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

clubsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getClubById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: 'Bad request', message: err.message });
  }
});

export default clubsRouter;
