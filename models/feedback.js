const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
