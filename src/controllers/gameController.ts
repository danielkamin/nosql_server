import models from '../models/index';
import { Request, Response } from 'express';

export const createGame = async (req: Request) => {
  try {
    const game = new models.Game({
      title: req.body.title,
      releaseDate: req.body.releaseDate,
      studio: req.body.studio,
      avgRating: null,
      imageURL: req.body.imageURL,
    });
    await game.save();
    return game._id;
  } catch (err) {
    return err;
  }
};
export const removeGame = async (req: Request) => {
  try {
    await models.Game.deleteOne({ _id: req.params.id });
    return true;
  } catch (err) {
    return err;
  }
};
export const updateGame = async (req: Request) => {
  try {
    await models.Game.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          studio: req.body.studio,
          releaseDate: req.body.releaseDate,
          imageURL: req.body.imageURL,
        },
      }
    );
    return true;
  } catch (err) {
    return err;
  }
};

export const getGame = async (req: Request) => {
  try {
    const game = await models.Game.findById(req.params.id).populate({
      path: 'avgRating',
      select: 'avgRating numOfVotes -_id',
    });
    const ratings = await models.Rating.find({ gameId: game._id }).populate({ path: 'user', select: '-password' });
    return { game: game, ratings: ratings };
  } catch (err) {
    return err;
  }
};

export const getGames = async (req: Request) => {
  try {
    const games = await models.Game.find({}).populate({ path: 'avgRating', select: 'avgRating numOfVotes -_id' });
    return games;
  } catch (err) {
    return err;
  }
};
