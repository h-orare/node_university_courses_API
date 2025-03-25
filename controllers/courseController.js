const Course = require('../models/courseModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllCourses = catchAsync(async (req, res, next) => {
  //BUILD QUERY
  //1.Filtering
  const queryObj = { ...req.query }; //destruecture then craete an object from req.query
  const excludeFields = ['page', 'sort', 'limit', 'fields'];
  excludeFields.forEach((el) => delete queryObj[el]);

  //2.Advanced Filtering

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = Course.find(JSON.parse(queryStr));

  //3. Field Limiting

  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v'); //we dont show the __v field
  }

  //4. PAGINATION

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;

  //above are default values

  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numCourses = await Course.countDocuments();
    if (skip >= numCourses) throw new Error('This page does not exist');
  }

  //EXECUTE QUERY

  const courses = await query;
  res.status(200).json({
    status: 'success',
    results: courses.length,
    data: {
      courses,
    },
  });
});

exports.getOneCourse = catchAsync(async (req, res, next) => {
  const courseName = req.params.course_name;
  const course = await Course.findOne({
    name: { $regex: new RegExp('^' + courseName + '$', 'i') },
  });

  if (!course) {
    return next(new AppError('No Course Found With that Name', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      course,
    },
  });
});

exports.createCourse = catchAsync(async (req, res, next) => {
  const course = await Course.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      course,
    },
  });
});
exports.updateCourse = catchAsync(async (req, res, next) => {
  const name = req.params.course_name;
  const course = await Course.findOneAndUpdate({ name: name }, req.body, {
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

exports.deleteCourse = catchAsync(async (req, res, next) => {
  const name = req.params.course_name;
  const course = await Course.findOneAndDelete({ name: name }); //no need to save anything coz we are not returning any data
  if (!course) {
    return next(new AppError('No Course Found With that Name', 404));
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});
