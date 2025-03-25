const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});
// exports.getUser = (req, res) => {
//   // console.log(req.reqTime);
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet implemented',
//   });
// };
// exports.createUser = (req, res) => {
//   // console.log(req.reqTime);
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet implemented',
//   });
// };
// exports.updateUser = (req, res) => {
//   // console.log(req.reqTime);
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet implemented',
//   });
// };
// exports.deleteUser = (req, res) => {
//   // console.log(req.reqTime);
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet implemented',
//   });
// };
