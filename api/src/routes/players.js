import { Router } from 'express';
import {
  getPlayerById, getAllPlayers, getPlayersByName,
} from '../services/playersService.js';

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
    res.json(result);
  } catch (err) {
    next(err);
  }
});

playersRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getPlayerById(id);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ error: 'Not Found', message: 'Player does not exist' });
    }
  } catch (err) {
    next(err);
  }
});

export default playersRouter;
