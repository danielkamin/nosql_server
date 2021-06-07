import mongoose from 'mongoose';
 
import Game from './Game';
import AvgRating from './AvgRating';
import Rating from './Rating';
const connectDb = () => {
  return mongoose.connect('mongodb://localhost:27017/projekt');
};
 
const models = { Game, AvgRating,Rating };
 
export { connectDb };
 
export default models;