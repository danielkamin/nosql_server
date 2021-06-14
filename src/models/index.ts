import mongoose from 'mongoose';
import User from './User';
import Game from './Game';
import AvgRating from './AvgRating';
import Rating from './Rating';
const connectDb = () => {
  return mongoose.connect('mongodb://localhost:27017/projekt', { useNewUrlParser: true, useUnifiedTopology: true });
};

const models = { Game, AvgRating, Rating, User };

export { connectDb };

export default models;
