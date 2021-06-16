import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  comment: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
