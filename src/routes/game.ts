import express from 'express';
import { getGame, getGames, createGame, removeGame, updateGame } from '../controllers/gameController';
const gameRouter = express.Router();

gameRouter.get('/:id', getGame);
gameRouter.get('/', getGames);
gameRouter.post('/', createGame);
gameRouter.put('/:id', updateGame);
gameRouter.delete('/:id', removeGame);
export default gameRouter;
