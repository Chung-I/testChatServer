import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  connected: Boolean
});

export const User = mongoose.model('User', userSchema);

