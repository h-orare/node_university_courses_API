const Course = require('../models/courseModel');

exports.getAllCourses = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getOneCourse = async (req, res) => {
  try {
    const courseName = req.params.course_name;
    const course = await Course.findOne({
      name: { $regex: new RegExp('^' + courseName + '$', 'i') },
    });

    res.status(200).json({
      status: 'success',
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid Data',
    });
  }
};
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.course_name,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(202).json({
      status: 'success',
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid Data',
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.course_name); //no need to save anything coz we are not returning any data

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid Data',
    });
  }
};
