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

module.exports = app;
