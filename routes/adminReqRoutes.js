const express = require('express');
const adminReqController = require('../controllers/adminReqController');
const router = express.Router();

router
  .route('/:course_name')
  .get(adminReqController.getCourseAdmissionRequirement);
router
  .route('/')
  .get(adminReqController.getAllAdminRequirements)
  .post(adminReqController.createAdmissionRequirement);

module.exports = router;
