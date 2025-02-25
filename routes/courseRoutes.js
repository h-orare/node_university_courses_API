const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.param('id', (req, res, next, val) => {
  //console.log(`Course id is ${val}`);

  next();
});

//above middleware not implemented anywhere in my code

router
  .route('/')
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);
router
  .route('/:course_name')
  .patch(courseController.updateCourse)
  .get(courseController.getOneCourse)
  .delete(courseController.deleteCourse);

module.exports = router;
