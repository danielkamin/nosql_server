import mongoose from 'mongoose';

const avgRatingSchema = new mongoose.Schema({
  avgRating: {
    type: Number,
    required: true,
  },
  numOfVotes: {
    type: Number,
    required: true,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
  },
});

const AvgRating = mongoose.model('AvgRating', avgRatingSchema);

export default AvgRating;
