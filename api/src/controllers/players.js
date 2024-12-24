import { Router } from 'express';
import {
  getPlayerById, getAllPlayers, getPlayersByName,
} from '../utils/dbManager.js';
import stripTimeStamps from '../utils/stripUnwantedColumns.js';

const playersRouter = Router();

playersRouter.get('/', async (req, res, next) => {
  const playerName = req.query.name;
  try {
    let result;
    if (playerName) {
      result = await getPlayersByName(playerName);
    } else {
      result = await getAllPlayers();
    }
    result = stripTimeStamps(result);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

playersRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = stripTimeStamps(await getPlayerById(id));
    if (result) {
      res.json(result[0]);
    } else {
      res.json([]);
    }
  } catch (err) {
    next(err);
  }
});

export default playersRouter;
