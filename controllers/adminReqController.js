const Admission = require('../models/adminModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllAdminRequirements = catchAsync(async (req, res, next) => {
  const admissions = await Admission.find();

  res.status(200).json({
    status: 'success',
    data: {
      admissions,
    },
  });
});
exports.getCourseAdmissionRequirement = catchAsync(async (req, res, next) => {
  const courseName = req.params.course_name;
  const admissions = await Admission.findOne({
    name: { $regex: new RegExp('^' + courseName + '$', 'i') },
  });

  if (!admissions) {
    return next(new AppError('No Course Found With that Name', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      admissions,
    },
  });
});
exports.createAdmissionRequirement = catchAsync(async (req, res, next) => {
  const admission = await Admission.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      admission,
    },
  });
});

exports.updateAdminRequirement = catchAsync(async (req, res, next) => {
  const name = req.params.course_name;
  const course = await Admission.findOneAndUpdate({ name: name }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    return next(new AppError('No Course Found With that Name', 404));
  }
  res.status(200).send({
    status: 'success',
    data: {
      course,
    },
  });
});

exports.deleteAdminRequirement = catchAsync(async (req, res, next) => {
  const name = req.params.course_name;
  const admission = await Admission.findOneAndDelete({ name: name }); //no need to save anything coz we are not returning any data

  if (!admission) {
    return next(new AppError('No Course Found With that Name', 404));
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});
