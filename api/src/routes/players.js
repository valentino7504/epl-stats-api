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

playersRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getPlayerById(id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: 'Bad request', message: err.message });
  }
});

export default playersRouter;
