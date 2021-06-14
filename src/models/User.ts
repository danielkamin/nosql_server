import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'userName is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: 8,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
