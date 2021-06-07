import mongoose from 'mongoose';

const avgRatingSchema = new mongoose.Schema({
  avgRating:{
    type:Number,
    required:true
  },
  numOfVotes:{
    type:Number,
    required:true
  }
});

const AvgRating = mongoose.model('AvgRating', avgRatingSchema);

export default AvgRating;
