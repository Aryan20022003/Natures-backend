const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authController = require('../controller/authController');

router.post('/signUp', authController.signUp);
router.post('/signIn', authController.signIn);

router
  .route('/:id')
  .get(authController.tokenVerification, userController.getUser)
  .patch(
    authController.tokenVerification,
    userController.updateUserById
  )
  .delete(
    authController.tokenVerification,
    authController.restrictTo(['admin']),
    userController.deleteUserById
  );

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.addNewUser);

module.exports = router;
