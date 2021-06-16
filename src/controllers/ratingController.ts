import models from '../models/index';
import { Request, Response } from 'express';
import { calcNewAvgRating } from '../helpers/index';

export const addRating = async (req: Request, res: Response) => {
  try {
    const oldRating = await models.Rating.findOne({ user: req.cookies._id, gameId: req.body.game });
    if (oldRating !== null) {
      res.status(400).send('Ocena już dodana');
      return;
    }
    const rating = new models.Rating({
      rating: +req.body.rating,
      gameId: req.body.game,
      comment: req.body.comment,
      user: req.cookies._id,
    });
    await rating.save();

    const avgRatingObject = await models.AvgRating.findOne({ game: req.body.game });

    if (avgRatingObject === null) {
      const newAvgRating = new models.AvgRating({
        avgRating: req.body.rating,
        numOfVotes: 1,
        game: req.body.game,
      });
      await newAvgRating.save();
      await models.Game.updateOne({ _id: req.body.game }, { $set: { avgRating: newAvgRating._id } });
    } else {
      let newAvg = calcNewAvgRating(avgRatingObject.avgRating, avgRatingObject.numOfVotes, +req.body.rating, true);
      let newRatingCount = ++avgRatingObject.numOfVotes;
      await avgRatingObject.updateOne({
        avgRating: newAvg,
        numOfVotes: newRatingCount,
      });
    }
    return true;
  } catch (err) {
    return err.toString();
  }
};

export const removeRating = async (req: Request) => {
  try {
    const rating = await models.Rating.findOneAndDelete({ _id: req.params.id });
    const avgRatingObject = await models.AvgRating.findOne({ game: rating.gameId });
    if (avgRatingObject.numOfVotes === 1) {
      await avgRatingObject.deleteOne();
    } else {
      let newAvg = calcNewAvgRating(avgRatingObject.avgRating, avgRatingObject.numOfVotes, rating.rating, false);
      let newRatingCount = --avgRatingObject.numOfVotes;
      await avgRatingObject.updateOne({
        avgRating: newAvg,
        numOfVotes: newRatingCount,
      });
    }
    return true;
  } catch (err) {
    return err.toString();
  }
};
