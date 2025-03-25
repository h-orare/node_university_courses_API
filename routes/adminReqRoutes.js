const express = require('express');
const adminReqController = require('../controllers/adminReqController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/:course_name')
  .get(authController.protect, adminReqController.getCourseAdmissionRequirement)
  .patch(
    authController.protect,
    authController.restrictTo('super_admin'),
    adminReqController.updateAdminRequirement,
  )
  .delete(
    authController.protect,
    authController.restrictTo('super_admin'),
    adminReqController.deleteAdminRequirement,
  );
router
  .route('/')
  .get(authController.protect, adminReqController.getAllAdminRequirements)
  .post(
    authController.protect,
    authController.restrictTo('super_admin'),
    adminReqController.createAdmissionRequirement,
  );

module.exports = router;
