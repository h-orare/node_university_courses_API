const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You must enter your name'],
  },
  email: {
    type: String,
    required: [true, 'You must enter your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide valid email'],
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'super_admin'],
    default: 'student',
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
    minlength: 8,
    select: false,
  },

  passwordconfirm: {
    type: String,
    required: [true, 'Confirm password Please'],
    validate: {
      //This only works on CREATE & SAVE. First sign up. But not say during update
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password Confirm failed',
    },
  },
  passwordChangedAt: Date,
});

//pasword encryption-

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordconfirm = undefined; // we dont want to persist to db confirmPass (its duplication). We only need to during validation

  next();
});
userSchema.methods.correctPassword = async function (
  candidatePass,
  userPassword,
) {
  return await bcrypt.compare(candidatePass, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const User = mongoose.model('Users', userSchema);

module.exports = User;
