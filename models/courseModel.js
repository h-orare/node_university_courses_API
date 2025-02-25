const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  fees_per_credit_hour: {
    type: Number,
    required: true,
  },
  career_path: [String],
  department: String,
  success_rate: Number,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
