const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  admission_requirements: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  term: {
    type: [String],
    required: true,
    enum: ['Fall', 'Spring', 'Summer'],
  },
});

const Admission = mongoose.model('Admission', adminSchema);

module.exports = Admission;
