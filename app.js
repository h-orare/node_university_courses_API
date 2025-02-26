const express = require('express');
const app = express();
const morgan = require('morgan');

const courseRouter = require('./routes/courseRoutes');
const requirementsRouter = require('./routes/adminReqRoutes');
const userRouter = require('./routes/userRoutes');

//1)MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} //we only want to log to console during developement

app.use(express.json());

app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();

  next();
});

app.use('/api/courses', courseRouter);
app.use('/api/admin-requirements', requirementsRouter);
app.use('/api/users', userRouter);
//below route handles all undefined requests
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'Fail',
    message: `Cant Find ${req.originalUrl} Resource on this Server!`,
  });

  // const err = new Error(
  //   `Cant Find ${req.originalUrl} Resource on this Server!`,
  // );
  // (err.status = 'fail'), (err.statusCode = 404);
  // next(err);
});

//error handler.
// app.use((err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error'; //its err.status if its defined or error
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });

module.exports = app;
