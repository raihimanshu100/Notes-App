

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  dob: String,
  googleId: String,
});

export default mongoose.model('User', userSchema);
