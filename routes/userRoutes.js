const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authController = require('../controller/authController');

router.post('/signUp', authController.signUp);
router.post('/signIn', authController.signIn);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.getUserById)
  .delete(userController.deleteUserById);

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.addNewUser);

module.exports = router;
