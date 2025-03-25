const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router
  .route('/users')
  .get(
    authController.protect,
    authController.restrictTo('super_admin'),
    userController.getAllUsers,
  );
//.post(userController.createUser);
// router
//   .route('/:id')
//   //.get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
