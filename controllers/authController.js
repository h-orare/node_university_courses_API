const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordconfirm: req.body.passwordconfirm,
    role: req.body.role,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1. check email & pass if exists
  if (!email || !password) {
    return next(new AppError('Please provide Email and Password!', 400));
  }
  //2.check if user exists & pass is correct
  const user = await User.findOne({ email: email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email or Password', 401));
  }
  // //3.Then send token to client

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

//middleware to protect routes such that only logged in users will get access
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  //1. get the token & check if it exits
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in. Please log in to continue!', 401),
    );
  }
  //2. Validate the token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3.check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists'),
    );
  }

  //4. check if user changed password after jwt was issued. Did not implement this
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User Recently Changed Password!.Please Log in Again', 401),
    );
  }
  //GRANT ACCES TO PROTECTED ROUTE
  req.user = currentUser;

  next();
});

//middleware to restrict deleting resources for certain routes
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You have no permission to perform this action!', 403),
      );
    }
    next();
  };
};
