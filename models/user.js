import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});

export const User = mongoose.model('User', userSchema);

