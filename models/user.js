const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  uploadedEmotes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Emotes',
    },
  ],
  channelEmotes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Emotes',
    },
  ],
  signUpDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  profilePic: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    default: 'default',
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
