const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const courseRouter = require('./routes/courseRoutes');
const requirementsRouter = require('./routes/adminReqRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1)GLOBAL MIDDLEWARES
//Set security HTTP Headers
app.use(helmet());

//developement logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} //we only want to log to console during developement

//Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 30 * 60 * 1000,
  message: 'Too many requests from this IP. Try again after 30mins',
});

app.use('/api', limiter);
//body parser- reading data from body into req.body
app.use(express.json());
//test middleware. Good for looking at headers by logging to console
app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();

  next();
});

app.use('/api/courses', courseRouter);
app.use('/api/admin-requirements', requirementsRouter);
app.use('/api/', userRouter);

//below route handles all undefined requests
app.all('*', (req, res, next) => {
  next(
    new AppError(`Cant Find ${req.originalUrl} Resource on this Server!`, 404),
  );
});

//error handler middleware.
app.use(globalErrorHandler);

module.exports = app;
