import express from 'express';
import { addRating, removeRating } from '../controllers/ratingController';
const ratingRouter = express.Router();

ratingRouter.post('/', addRating);
ratingRouter.delete('/', removeRating);

export default ratingRouter;
