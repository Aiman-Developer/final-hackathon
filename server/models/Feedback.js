const mongoose = require('mongoose');
const FeedbackSchema = new mongoose.Schema({
  name: String, email: String, course: String, rating: Number, comments: String, createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Feedback', FeedbackSchema);
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  rating: Number,
  comments: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
