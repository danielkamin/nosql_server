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
  }
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
