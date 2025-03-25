const express = require('express');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

const router = express.Router();

router.param('id', (req, res, next, val) => {
  //console.log(`Course id is ${val}`);

  next();
});

//above middleware not implemented anywhere in my code

router
  .route('/')
  .get(authController.protect, courseController.getAllCourses)
  .post(
    authController.protect,
    authController.restrictTo('super_admin'),
    courseController.createCourse,
  );
router
  .route('/:course_name')
  .patch(
    authController.protect,
    authController.restrictTo('super_admin'),
    courseController.updateCourse,
  )
  .get(authController.protect, courseController.getOneCourse)
  .delete(
    authController.protect,
    authController.restrictTo('super_admin'),
    courseController.deleteCourse,
  );

module.exports = router;
