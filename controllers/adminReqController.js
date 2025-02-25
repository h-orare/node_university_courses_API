const Admission = require('../models/adminModel');

exports.getAllAdminRequirements = async (req, res) => {
  try {
    const admissions = await Admission.find();

    res.status(201).json({
      status: 'success',
      data: {
        admissions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getCourseAdmissionRequirement = async (req, res) => {
  try {
    const courseName = req.params.course_name;
    const admissions = await Admission.findOne({
      name: { $regex: new RegExp('^' + courseName + '$', 'i') },
    });

    res.status(201).json({
      status: 'success',
      data: {
        admissions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.createAdmissionRequirement = async (req, res) => {
  try {
    const admission = await Admission.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        admission,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
