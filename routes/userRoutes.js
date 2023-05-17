const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

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
