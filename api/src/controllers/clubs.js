import { Router } from 'express';
import {
  getClubById, getAllClubs, getClubByName,
} from '../utils/dbManager.js';
import stripTimeStamps from '../utils/stripUnwantedColumns.js';

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
    result = stripTimeStamps(result);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

clubsRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = stripTimeStamps(await getClubById(id));
    if (result) {
      res.json(result[0]);
    } else {
      res.json([]);
    }
  } catch (err) {
    next(err);
  }
});

export default clubsRouter;
