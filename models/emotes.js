const mongoose = require('mongoose');

const EmotesSchema = new mongoose.Schema({
  emoteName: {
    type: String,
    required: true,
    trim: true,
  },
  largeImgUrl: {
    type: String,
    required: true,
    trim: true,
  },
  smallImgUrl: {
    type: String,
    required: true,
    trim: true,
  },
  uploadDate: {
    type: String,
    required: true,
    default: Date.now(),
  },
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  descriptionForApproval: { type: String, required: true, trim: true },
});

EmotesSchema.post('remove', function (doc) {
  Event.remove({ _id: { $in: doc.eventsAttended } });
});

const Emotes = mongoose.model('Emotes', EmotesSchema);

module.exports = Emotes;
