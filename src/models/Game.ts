import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  studio: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  avgRating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AvgRating',
  },
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
